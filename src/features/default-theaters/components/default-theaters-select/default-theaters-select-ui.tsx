import { Box, Typography, Button, Stack } from "@mui/material";
import { CinemaStyledButton } from "@shared/components/";
import type { TDefaultTheatersSelectUIProps } from "./types";


export const DefaultTheatersSelectUI = ({
  cinemas,
  selected,
  onChange,
  onSelectAll,
  onClear,
}: TDefaultTheatersSelectUIProps) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Кинотеатры по умолчанию
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Выберите кинотеатры, которые будут использоваться по умолчанию
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button size="small" variant="text" color="secondary" onClick={onSelectAll}>
          Выбрать все
        </Button>
        <Button size="small" variant="text" color="secondary" onClick={onClear}>
          Очистить
        </Button>
      </Stack>

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
    </Box>
  );
};