import { SidebarUI } from './sidebar-ui';
import { useCallback } from 'react';
import type { ISidebarProps } from './types';


export const Sidebar = ({expanded, setExpanded }: ISidebarProps) => {

  const getDrawerSx = useCallback(
    () => {
      const width = expanded ? 240 : 90;
      return {
        width,
        flexShrink: 0,
        transition: `width 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
        overflowX: 'hidden',
        '& .MuiDrawer-paper': {
          width,
          position: 'absolute',
          boxSizing: 'border-box',
          backgroundImage: 'none',
          transition: `width 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
          overflowX: 'hidden',
        },
      };
    },
    [expanded],
  );

  return (
    <SidebarUI
      expanded={expanded}
      getDrawerSx={getDrawerSx}
      onClose={() => setExpanded(false)}
    />
  );
};