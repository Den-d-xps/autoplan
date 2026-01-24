import { Drawer } from '@mui/material';
import type { ISidebarUIProps } from './types';
import { SidebarContent } from '../sidebar-content';


export const SidebarUI = ({ expanded, getDrawerSx, onClose }: ISidebarUIProps) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={expanded}
        onClose={onClose}
        sx={{ display: { xs: 'block', sm: 'none' }, ...getDrawerSx() }}
      >
        <SidebarContent />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' }, ...getDrawerSx() }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};