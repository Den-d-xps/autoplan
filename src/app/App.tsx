import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './providers/route/router';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../features/theme/AppTheme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <AppTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ AppTheme>
  )
}

export default App
