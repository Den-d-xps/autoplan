import { Box, Divider, Typography } from "@mui/material";
import type { TPageLayoutProps } from "./types";

export const PageLayout = ({title, children}: TPageLayoutProps) => (
  <Box sx={{
      textAlign: "start",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative"
  }}>
    <Typography
      variant="h3"
      color="primary"
      sx={{
        textTransform: "uppercase"
      }
    }>
      {title}
    </Typography>
    <Divider sx={{ my: 2}} />
    <Box className="scroll" sx={{
      overflow: "auto",
      height: "100%",
      width: "100%",
      scrollbarGutter: 'stable'
    }}>
      {children}
    </Box>
  </Box>
);
