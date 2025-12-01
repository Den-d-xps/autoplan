import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { type ITaskState, type TTask, Status } from "./types";


const initialState: ITaskState = {
  queue: [],
  isRunning: false,
};

export const taskQueueSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<TTask>) {
        state.queue.push(action.payload);
      },
      prepare(task: Omit<TTask, "id" | "status" | "progress" | "message">) {
        return {
          payload: {
            ...task,
            status: Status.pending,
            id: nanoid(),
            progress: 0,
            message: "",
          },
        };
      }
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: Status; error?: string }>) => {
      const { id, status, error } = action.payload;
      const task = state.queue.find((task) => task.id === id);
      if (task) {
        task.status = status;
        if (error) {
          task.error = error;
        }
      }
    },
    updateProgress: (state, action: PayloadAction<{ id: string; progress: number; message: string }>) => {
      const { id, progress, message } = action.payload;
      const task = state.queue.find((task) => task.id === id);
      if (task) {
        task.progress = progress;
        task.message = message;
      }
    },
    setRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload
    }
  },
  selectors: {
    selectTasks: (state) => state.queue,
    selectIsRunning: (state) => state.isRunning,
    selectTaskById: (state) => (id: string) => state.queue.find((task) => task.id === id),
  },
});

export const tasksActions = taskQueueSlice.actions;
export const tasksSelectors = taskQueueSlice.selectors;

