import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { appSlice } from '@/app/model';
import { authSlice } from '@feat/auth/model';
import { taskQueueSlice } from '@entities/tasks';
import { sidebarSlice } from '@/widgets/sidebar';
import { modalSlice } from '@feat/modal';
import { settingsSlice } from '@entities/settings';
import { userSlice } from '@entities/user';



const rootReducer = combineSlices(
  appSlice,
  authSlice,
  sidebarSlice,
  modalSlice,
  taskQueueSlice,
  settingsSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

