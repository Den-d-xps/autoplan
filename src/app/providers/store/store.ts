import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authSlice } from '@feat/auth/model';
import { taskQueueSlice } from '@entities/tasks';
import { sidebarSlice } from '@/widgets/sidebar';


const rootReducer = combineSlices(
  authSlice,
  sidebarSlice,
  taskQueueSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

