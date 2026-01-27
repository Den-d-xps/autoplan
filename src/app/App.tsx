import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from '@router';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../features/theme/AppTheme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from 'react-redux';
import { store } from '@store';
import { useTauriEvent } from '@/entities/tasks';
import { ModalsRoot } from '@/features/modal/components/modal-root/modal-root';


export const App = () => {
  return (
    <AppTheme>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline enableColorScheme />
          <InitialApp />
          <ModalsRoot />
        </LocalizationProvider>
      </Provider>
    </ AppTheme>
  )
}

const InitialApp = () => {
  useTauriEvent();
  return <RouterProvider router={router} />
}
