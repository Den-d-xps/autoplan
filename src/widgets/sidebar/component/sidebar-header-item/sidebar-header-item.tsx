import { ListSubheader } from '@mui/material';
import type { ISidebarHeaderItemProps } from './types';
import { useAppSelector } from '@/app/providers/store';
import { sidebarSelectors } from '../../model/sidebar-slice';


export function SidebarHeaderItem({ title }: ISidebarHeaderItemProps) {
  const expanded = useAppSelector(sidebarSelectors.selectExpanded);

  return (
    <ListSubheader
      sx={{
        fontSize: 12,
        fontWeight: 600,
        height: expanded ? 36 : 0,
        position: 'relative',
        px: 1.5,
        py: 0,
        minWidth: 240,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        zIndex: 2,
        transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {title}
    </ListSubheader>
  );
}
