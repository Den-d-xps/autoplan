import * as React from 'react';
import Divider from '@mui/material/Divider';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { getDrawerSxTransitionMixin } from '../../../../shared/mixins';
import SidebarContext from '../../context/sidebar-context';

export default function SidebarDividerItem() {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error('Sidebar context was used without a provider.');
  }
  const { fullyExpanded = true, hasDrawerTransitions } = sidebarContext;

  return (
    <li style={{ 
      flexGrow: 1,
      alignContent: 'end',
    }}>
      <Divider
        sx={{
          borderBottomWidth: 1,
          my: 1,
          mx: -0.5,
          ...(hasDrawerTransitions
            ? getDrawerSxTransitionMixin(fullyExpanded, 'margin')
            : {}),
        }}
      />
    </li>
  );
}
