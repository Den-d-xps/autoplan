import { Box, Divider, Input, TextField, Typography } from "@mui/material";
import { LightMacrosForm } from "../../features/light-macros/components/light-macros-form/light-macros-form";


export const LightMacrosPage = () => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Typography variant="h3">Light Macros Page</Typography>
      <Divider sx={{ my: 3 }} />
      <LightMacrosForm onSubmit={(data) => {console.log(data)}} />
    </Box>
  );
};