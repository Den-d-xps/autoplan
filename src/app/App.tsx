import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from '@router';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../features/theme/AppTheme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from 'react-redux';
import { store } from '@store';

export const App = () => {
  return (
    <AppTheme>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline enableColorScheme />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </Provider>
    </ AppTheme>
  )
}

export default App
