import { useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';
import { SidebarItem } from '../sidebar-item';
import { SidebarContentUI } from './sidebar-content-ui';
import { useAppSelector } from '@/app/providers/store';
import { sidebarSelectors } from '../../model/sidebar-slice';
import type { MenuItem } from '../../model/types';
import { ICONS } from '../../model/icon-map';


export const SidebarContent = () => {
  const { pathname } = useLocation();
  const mainListItems = useAppSelector(sidebarSelectors.selectListMainItems);
  const nestedListItems = useAppSelector(sidebarSelectors.selectListNestedItems);
  const expanded = useAppSelector(sidebarSelectors.selectExpanded);

  const renderItem = (item: MenuItem) => { 
      return (
        <SidebarItem
          id={item.id}
          title={item.title as string}
          icon={ICONS[item.id]}
          action={item.action}
          selected={!!matchPath(item.action.type === 'route' ? item.action.to : 'null', pathname)}
        />
      );
  };

  const mainListElements = mainListItems.map(renderItem);
  const nestedListElements = nestedListItems.map(renderItem);

  return (
    <SidebarContentUI 
      mainListElements={mainListElements} 
      nestedListElements={nestedListElements}
      expanded={expanded} 
    />
  );
};