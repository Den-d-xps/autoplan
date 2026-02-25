import { Box } from "@mui/material";
import type { ITabPanelProps } from "./types";


export const TabPanel = ({ children, value, index, ...other }: ITabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}