import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import type {} from '@mui/material/themeCssVarsAugmentation';
import WbIncandescent  from '@mui/icons-material/WbIncandescent';
import Settings from '@mui/icons-material/Settings';
import Info from '@mui/icons-material/Info';
import { matchPath, useLocation } from 'react-router';
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '../../shared/mixins';
import SidebarPageItem from './component/sidebar-page-item/sidebar-page-item';
import SidebarHeaderItem from './component/sidebar-header-item/sidebar-header-item';
import SidebarDividerItem from './component/sidebar-divider-item/sidebar-divider-item';
import SidebarContext from './context/sidebar-context';


export interface DashboardSidebarProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
  container?: Element;
}

export default function Sidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}: DashboardSidebarProps) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => {};
  }, [expanded, theme.transitions.duration.enteringScreen]);

  React.useEffect(() => {
    if (!expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return () => {};
  }, [expanded, theme.transitions.duration.leavingScreen]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded],
  );

  const handlePageItemClick = React.useCallback(
    (itemId: string, hasNestedNavigation: boolean) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId,
              )
            : [...previousValue, itemId],
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded, isOverSmViewport],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport: 'phone' | 'tablet' | 'desktop') => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            scrollbarGutter: mini ? 'stable' : 'auto',
            overflowX: 'hidden',
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
              : {}),
          }}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? 90 : 'auto',
              flexBasis: '100%',
            }}
          >
            <SidebarHeaderItem>Основоной  функционал</SidebarHeaderItem>
            <SidebarPageItem
              id="light-macros"
              title="Метки света"
              icon={<WbIncandescent />}
              href="/light-macros"
              selected={!!matchPath('/light-macros', pathname) || pathname === '/'}
            />
            <SidebarDividerItem />
            <SidebarHeaderItem>Дополнительно</SidebarHeaderItem>
            <SidebarPageItem
              id="settings"
              title="Настройки"
              icon={<Settings />}
              href="/settings"/>
            <SidebarPageItem
              id="info"
              title="О программе"
              icon={<Info />}
              href="/info"
            />
          </List>
        </Box>
      </React.Fragment>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, pathname],
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? 90 : 240;

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      };
    },
    [expanded, mini],
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </SidebarContext.Provider>
  );
}
