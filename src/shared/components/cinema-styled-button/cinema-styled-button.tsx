import { ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";


export const CinemaStyledButton = styled(ToggleButton)(({ theme }) => ({
  margin: theme.spacing(0.1),
  padding: "4px 10px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "12px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));