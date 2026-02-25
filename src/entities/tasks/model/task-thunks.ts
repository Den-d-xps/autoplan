import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";
import { Status, type ITaskState } from "./types";
import { tasksActions } from "./task-slice";

export const runNextTask = createAsyncThunk(
  "tasks/runNext",
  async (_, { getState, dispatch }) => {
    const state = getState() as { tasks: ITaskState };
    const task = state.tasks.queue.find((task) => task.status === Status.pending);

    if (!task) {
      dispatch(tasksActions.setRunning(false));
      return;
    }

    dispatch(tasksActions.setRunning(true));

    try {
      dispatch(tasksActions.updateStatus({ id: task.id, status: Status.running })); 
      await invoke(task.script, { ...task.payload, id: task.id });
      dispatch(tasksActions.updateStatus({ id: task.id, status: Status.finished }));
    } catch (err) {
      dispatch(tasksActions.updateStatus({ id: task.id, status: Status.error }));
    }

    dispatch(runNextTask()); // рекурсивно запускаем следующий
  }
);