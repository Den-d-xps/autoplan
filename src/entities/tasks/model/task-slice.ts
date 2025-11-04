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
      prepare(task: Omit<TTask, "id" | "status">) {
        return {
          payload: {
            ...task,
            status: Status.pending,
            id: nanoid(),
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
    setRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload
    }
  },
  selectors: {
    selectTasks: (state) => state.queue,
    selectIsRunning: (state) => state.isRunning
  },
});

export const tasksActions = taskQueueSlice.actions;
export const tasksSelectors = taskQueueSlice.selectors;

export default taskQueueSlice;
