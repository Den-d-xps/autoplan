import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './providers/route/router';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../features/theme/AppTheme';

function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ AppTheme>
  )
}

export default App
