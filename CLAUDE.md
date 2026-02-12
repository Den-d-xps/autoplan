# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Autoplan is a **Tauri 2 + React 19** desktop application for automating interactions with the Kinoplan cinema management system. The app uses **Playwright** automation scripts executed via Rust backend commands.

**Tech Stack:**
- Frontend: React 19, TypeScript (strict), Vite 7, Material-UI 7, Redux Toolkit, React Hook Form + Yup
- Backend: Tauri 2, Rust 1.77.2
- Automation: Node.js + Playwright (bundled with app)

## Development Commands

### Frontend Development
```bash
npm run dev              # Start Vite dev server (port 5173)
npm run build            # Production build to dist/
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Tauri Development
```bash
npm run tauri dev        # Run Tauri app in dev mode (auto-runs build:scripts + dev)
npm run tauri build      # Build production desktop app
```

### Automation Scripts
```bash
npm run build:scripts    # Compile TypeScript scripts in automation/ to dist/
                         # Required before running Tauri (auto-run by beforeDevCommand)
```

**Important:** Always run `npm run build:scripts` after modifying files in `automation/scripts/`. Tauri bundles the compiled JS from `automation/dist/scripts/`.

## Architecture

### Feature-Sliced Design (FSD)

The frontend follows **FSD** with strict layer separation:

```
src/
├── app/          # Application initialization, providers (Router, Redux, Theme)
├── pages/        # Route pages (light-macros, tasks, settings, info)
├── widgets/      # Composite UI blocks (header, sidebar, task-list)
├── features/     # Business features (auth, light-macros, modal, theme)
├── entities/     # Business entities (settings, tasks, user) with Redux slices
└── shared/       # Reusable components (page-layout, vertical-tabs)
```

**Layer rules:**
- Lower layers cannot import from higher layers
- Each layer exports public API via `index.ts`
- Features are independent and don't import from each other

### Path Aliases

Use these TypeScript path aliases (configured in `tsconfig.app.json`):

```typescript
@/*                    → src/*
@app/                  → src/app/
@router                → src/app/providers/route/
@store                 → src/app/providers/store/
@entities/*            → src/entities/*
@feat/*                → src/features/*
@pages/                → src/pages/
@shared/components/    → src/shared/components/
@widgets/              → src/widgets/
```

Example: `import { store, useAppDispatch } from '@store';`

### Redux Store Structure

Global state managed by Redux Toolkit with 6 slices:

```typescript
// src/app/providers/store/store.ts
{
  auth: authSlice,           // Login status
  taskQueue: taskQueueSlice, // Task queue + runNextTask thunk
  sidebar: sidebarSlice,     // Sidebar open/close state
  modal: modalSlice,         // Current modal ID
  settings: settingsSlice,   // App configuration (theaters list)
  user: userSlice            // User data (name, avatar, theaters)
}
```

**Usage pattern:**
```typescript
import { useAppDispatch, useAppSelector } from '@store';

const dispatch = useAppDispatch();
const tasks = useAppSelector(state => state.taskQueue.tasks);
```

### Tauri IPC Pattern

**Frontend → Rust Commands:**
```typescript
import { invoke } from '@tauri-apps/api/core';

// Call Rust command
const result = await invoke('set_light_macros', {
  movieName: "Movie Title",
  cinemaNumber: "1",
  hours: "01",
  minutes: "30",
  seconds: "00",
  position: "start",
  id: taskId
});
```

**Available commands** (in `src-tauri/src/main.rs`):
- `login()` - Authenticate with Kinoplan
- `check_auth()` - Verify authentication status
- `set_light_macros(...)` - Set light markers on cinema equipment
- `get_theaters()` - Fetch available theaters list

**Rust → Frontend Events:**
```typescript
import { listen } from '@tauri-apps/api/event';

// Listen to progress updates
const unlisten = await listen('macro-progress', (event) => {
  const { id, progress, message } = event.payload;
  dispatch(tasksActions.updateProgress({ id, progress, message }));
});
```

Tauri emits `macro-progress` events during script execution. See `useTauriEvent` hook in `src/entities/tasks/hooks/use-tauri-event.ts`.

### Automation Scripts Architecture

Rust commands spawn Node.js processes to run Playwright automation scripts:

```
Rust Command (main.rs)
  ↓ spawns
Node.js + Playwright script (automation/dist/scripts/*.js)
  ↓ uses bundled
Chromium browser (automation/chromium/)
  ↓ interacts with
Kinoplan website
  ↓ emits progress via
stdout JSON → Rust → Tauri events → React
```

**Script structure:**
```typescript
// automation/scripts/some-script.ts
export async function runScript() {
  const browser = await chromium.launch({
    executablePath: chromiumPath
  });

  // Emit progress to Rust
  console.log(JSON.stringify({
    progress: 50,
    message: "Processing..."
  }));

  // ... automation logic
}
```

Rust reads stdout, parses JSON, and emits `macro-progress` events to frontend.

### Task Queue System

Tasks are queued in Redux and executed sequentially by `runNextTask` thunk:

```typescript
// src/entities/tasks/model/task-thunks.ts
export const runNextTask = createAsyncThunk('taskQueue/runNextTask', async (_, { dispatch, getState }) => {
  const task = selectNextPendingTask(getState());
  if (!task) return;

  dispatch(tasksActions.updateStatus({ id: task.id, status: Status.running }));

  try {
    await invoke(task.script, { ...task.payload, id: task.id });
    dispatch(tasksActions.updateStatus({ id: task.id, status: Status.finished }));
  } catch (err) {
    dispatch(tasksActions.updateStatus({ id: task.id, status: Status.error }));
  }

  dispatch(runNextTask()); // Process next task
});
```

**Task lifecycle:** pending → running → (finished | error)

## Component Patterns

### Container/Presentational Split

Many features use a two-file pattern:

```
light-macros-form/
├── light-macros-form.tsx       # Container: hooks, Redux, form logic
└── light-macros-form-ui.tsx    # Presentational: receives FormProvider context
```

The `-ui` variant accesses form context via `useFormContext()` from React Hook Form.

### Form Validation Pattern

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  cpl: yup.string().required('Required'),
  hours: yup.string().matches(/^\d{2}$/, 'Invalid').required(),
  // ...
});

const methods = useForm({
  resolver: yupResolver(schema),
  defaultValues: { cpl: '', hours: '', ... }
});
```

## Important Notes

### Bundled Resources

The Tauri app bundles Node.js runtime and Chromium browser. These are resolved at runtime:

```rust
// src-tauri/src/main.rs
let current_dir = std::env::current_exe()?.parent()?;
let node_path = current_dir.join("node.exe");
let browser_dir = current_dir.join("chromium");
let script_dir = current_dir.join("scripts");
```

When modifying scripts in `automation/scripts/`, you must:
1. Edit the `.ts` file
2. Run `npm run build:scripts` to compile to `automation/dist/scripts/`
3. The bundler copies `dist/scripts/` → Tauri resources

### Known Issues

1. **Typo in script name:** `instal_light_macros.js` should be `install_light_macros.js`
2. **Error handling:** `task-thunks.ts` catch block doesn't pass error message to Redux state
3. **Recursion risk:** `runNextTask` uses recursive dispatch - could overflow with large queues (>100 tasks)
4. **No input validation:** Rust commands don't sanitize arguments before passing to Node.js

### Development Workflow

1. Frontend changes: Edit `src/` → Hot reload works automatically
2. Rust backend changes: Edit `src-tauri/src/` → Restart `npm run tauri dev`
3. Automation script changes: Edit `automation/scripts/*.ts` → Run `npm run build:scripts` → Restart Tauri
4. Style changes: Material-UI theme in `src/app/providers/theme/`

### Testing

⚠️ **No tests currently exist.** When adding tests:
- Unit tests: Use Jest or Vitest with React Testing Library
- Integration tests: Test Redux thunks with mock `invoke`
- E2E tests: Use Playwright to test the Tauri app (not Kinoplan automation)
