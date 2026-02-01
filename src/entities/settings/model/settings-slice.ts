import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ISettings, ISettingsState } from './types';
import { DEFAULT_SETTINGS } from '../config';


const initialState: ISettingsState = {
  settings: DEFAULT_SETTINGS,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheaters(state, action: PayloadAction<ISettings['main']['theaters']>) {
      state.settings.main.theaters = action.payload;
    },
    setAllSettings(state, action: PayloadAction<ISettings>) {
      state.settings = action.payload;
    },
    resetSettings(state) {
      state.settings = DEFAULT_SETTINGS;
    },
  },
  selectors: {
    selectSettings: (state) => state.settings,
    selectTheaters: (state) => state.settings.main.theaters,
  }
});

export const settingsActions = settingsSlice.actions;
export const settingsSelectors = settingsSlice.selectors;
