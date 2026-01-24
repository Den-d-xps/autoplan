import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router';
import { Header, Sidebar } from '@widgets/';
import { useAppDispatch, useAppSelector } from '../store';
import { sidebarSelectors, toggleExpanded } from '@/widgets/sidebar';


export default function DashboardLayout() {

  const isMenuOpen = useAppSelector(sidebarSelectors.selectExpanded);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    dispatch(toggleExpanded());
  };

  

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Header
        // logo={<SitemarkIcon />}
        title="AUTOPLAN"
        menuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
      />
      <Sidebar
        expanded={isMenuOpen}
        setExpanded={toggleMenu}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Outlet  />
        </Box>
      </Box>
    </Box>
  );
}
