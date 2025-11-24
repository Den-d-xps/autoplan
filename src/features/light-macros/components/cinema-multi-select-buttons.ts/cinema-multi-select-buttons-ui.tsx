import { Badge, Box, Chip, Paper, Typography } from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { CinemaStyledButton } from "../cinema-styled-button/cinema-styled-button";
import type { TCinemaMultiSelectButtonsUIProps } from "./types";


export const CinemaMultiSelectButtonsUI = ({ 
  cinemas,                                     // список кинотеатров
  selected,                                    // выбранные кинотеатры
  onChange,                                    // callback функция выбора
  onClear                                      // callback функция очистки
}: TCinemaMultiSelectButtonsUIProps) => {
  return (
    <Paper style={{ display: "flex", flexWrap: "wrap", padding: 12, position: "relative" }}>
      <Badge badgeContent={selected.length} color="primary" >
        <Typography variant="h5" color="textSecondary">Кинотеатры:</Typography>
      </Badge>
      <Box sx={{ flexGrow: 1, mt: 2}}>
        {cinemas.map((cinema) => {
          const cinemaNumber = cinema.slice(2);
          return (
          <CinemaStyledButton
            key={cinema}
            value={cinemaNumber}
            selected={selected.includes(cinemaNumber)}
            onChange={() => onChange(cinemaNumber)}
          >
            {cinema}
          </CinemaStyledButton>
        )})}
      </Box>
      <Chip 
        label="Очистить"
        icon={<CleaningServicesIcon />}
        color="default" 
        onClick={onClear} 
        sx={{ 
          position: "absolute", 
          top: 12, 
          right: 20 
        }} 
      />
    </Paper>
  );
}