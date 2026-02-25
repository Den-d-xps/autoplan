import { Box, List, Toolbar } from "@mui/material";
import type { ISidebarContentUIProps } from "./types";
import { SidebarHeaderItem } from "../sidebar-header-item";
import { SidebarDividerItem } from "../sidebar-divider-item";


export const SidebarContentUI = ({ mainListElements, nestedListElements, expanded }: ISidebarContentUIProps) => {
  return (
    <>
      <Toolbar />
      <Box
        component="nav"
        sx={{
          height: '100%',
          overflow: 'auto',
          overflowX: 'hidden',
          pt: expanded ? 0 : 2,
        }}
      >
        <List 
          dense 
          sx={{ 
            padding: expanded ? 0.5 : 0, 
            pb: 2 , 
            width: expanded ? 'auto' : 90, 
            height: '100%'
          }}
        >
          <SidebarHeaderItem
            key='automation-header'
            title='Сценарии автоматизации' 
          />
          {mainListElements}
          <SidebarDividerItem id='divider-1' />
          <SidebarHeaderItem
            key='additional-header'
            title='Дополнительно' 
          />
          {nestedListElements}
        </List>
      </Box>
    </>
  )
};