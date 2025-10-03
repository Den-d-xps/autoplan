import { Box, Input, TextField, Typography } from "@mui/material";
import MyForm from "../../features/light-macros/components/forms/light-macros-form/light-macros-form";

export const LightMacrosPage = () => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Typography variant="h3">Light Macros Page</Typography>
      <MyForm />
    </Box>
  );
};