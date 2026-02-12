import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Box,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CinemaStyledButton } from "../cinema-styled-button";
import type { TCinemaMultiSelectButtonsUIProps } from "./types";
import { ToggleButtonsChoice } from "../toggle-buttons-choice";


export const CinemaMultiSelectButtonsUI = ({
  cinemas,                                     // список кинотеатров
  selected,                                    // выбранные кинотеатры
  onChange,                                    // callback функция выбора
  onClear,                                     // callback функция очистки
  onSelectAll,                                 // callback функция выбора всех
  onSelectDefault,                             // callback функция выбора по умолчанию
  isAllSelected,                               // выбраны ли все кинотеатры
  isDefaultSelected,                           // выбраны ли кинотеатры по умолчанию
}: TCinemaMultiSelectButtonsUIProps) => {
  return (
    <Accordion defaultExpanded={false} sx={{borderRadius: "10px"}}>
      <AccordionSummary
      >
          <Badge badgeContent={selected.length} color="primary">
            <Typography variant="h5" color="textSecondary">
              Кинотеатры:
            </Typography>
          </Badge>

          <ToggleButtonsChoice
            onSelectAll={onSelectAll}
            onSelectDefault={onSelectDefault}
            onClear={onClear}
            isAllSelected={isAllSelected}
            isDefaultSelected={isDefaultSelected}
          />
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}