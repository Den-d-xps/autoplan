import { Box, Tabs } from "@mui/material";
import type { ITabsLayoutUIProps } from "./types";


export const TabsLayoutUI = ({ 
  value, 
  handleChange, 
  tabsElements, 
  tabsPanelElements
}: ITabsLayoutUIProps) => {
  
  return (
    <Box
      sx={{
        display: "flex",
        height: '70vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 3, borderColor: 'divider', }}
        slotProps={{
          list : {
            sx: {
              width: 150,
              alignItems: "center",
            }
          }
        }}
      >
        {tabsElements}
      </Tabs>
      {tabsPanelElements}
    </Box>
  );
};