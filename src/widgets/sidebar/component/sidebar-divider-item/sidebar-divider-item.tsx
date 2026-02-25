import { Divider } from '@mui/material';
import type { ISidebarDeviderItemProps } from './types';
import { useAppSelector } from '@/app/providers/store';
import { sidebarSelectors } from '../../model/sidebar-slice';


export function SidebarDividerItem({ id }: ISidebarDeviderItemProps) {
  const expanded = useAppSelector(sidebarSelectors.selectExpanded);

  return (
    <li
      key={id}
      style={{
        flexGrow: 1,
        alignContent: 'end',
      }}
    >
      <Divider
        sx={{
          borderBottomWidth: 1,
          my: 1,
          mx: expanded ? -1 : -0.5,
          transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </li>
  );
}
