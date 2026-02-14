import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isInitialized: boolean;
  progress: number;
  statusMessage: string;
  error: string | null;
}

const initialState: AppState = {
  isInitialized: false,
  progress: 0,
  statusMessage: "",
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized(state) {
      state.isInitialized = true;
    },
    setProgress(state, action: PayloadAction<{ progress: number; message: string }>) {
      state.progress = action.payload.progress;
      state.statusMessage = action.payload.message;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetInit(state) {
      state.isInitialized = false;
      state.progress = 0;
      state.statusMessage = "";
      state.error = null;
    },
  },
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
    selectProgress: (state) => state.progress,
    selectStatusMessage: (state) => state.statusMessage,
    selectError: (state) => state.error,
  },
});

export const appActions = appSlice.actions;
export const appSelectors = appSlice.selectors;