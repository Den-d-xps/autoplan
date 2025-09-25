# Autoplan

Autoplan — это desktop-приложение на базе **Tauri + React + Vite + TypeScript**, созданное для автоматизации некоторых действий на сайте [Kinoplan](https://kinoplan.ru).

## 🚀 Стек технологий

- [Tauri](https://tauri.app/) — лёгкий фреймворк для создания desktop-приложений
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) — фронтенд
- [TypeScript](https://www.typescriptlang.org/) — типизация
- [Material UI](https://mui.com/) — UI-компоненты
- [Rust](https://www.rust-lang.org/) — бэкенд-часть Tauri
- [Playwright](https://playwright.dev/) — автоматизация действий в браузере

## 📦 Установка и запуск

### Предварительные требования

- **Node.js** >= 16
- **Rust** (с установленным `cargo`)
- Windows с Visual Studio Build Tools (для сборки Tauri)

### Установка зависимостей
``` bash
npm install
```

### Установка Playwright (браузеры)
```
npx playwright install
```

### Запуск в режиме разработки
```
npm run tauri dev
```

### Сборка приложения
```
npm run tauri build
```

Собранные бинарники будут в папке:
`src-tauri/target/release`

## 🛠️ Функциональность (планируется)

- Автоматизация действий на сайте Kinoplan с помощью Playwright
- Удобный интерфейс на базе Material UI
- Возможность расширять список автоматизируемых сценариев

## 📂 Структура проекта

```
autoplan/
├── src/                        # React + Vite фронтенд (FSD)
│   ├── app/                    # Инициализация приложения
│   ├── pages/                  # Страницы (собирают вид из features + widgets)
│   ├── widgets/                # Крупные блоки интерфейса (header, sidebar, etc.)
│   ├── features/               # Фичи
│   ├── entities/               # Сущности
│   ├── shared/                 # Переиспользуемые части
├── src-tauri/                  # Бэкенд на Rust (Tauri)
├── package.json                # Скрипты и зависимости Node.js
├── vite.config.ts              # Конфиг Vite
└── README.md                   # Документация проекта
```

## 🧑‍💻 Разработка

- Основная ветка: `main`
- Ветка для разработки: `dev`

---

💡 **Autoplan** призван облегчить работу с Kinoplan, автоматизируя рутинные действия и ускоряя рабочие процессы.