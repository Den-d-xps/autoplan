import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import type { TToggleButtonsChoiceProps } from "./types";

export const ToggleButtonsChoice = ({
  onSelectAll,
  onSelectDefault,
  onClear,
  isAllSelected,
  isDefaultSelected,
}: TToggleButtonsChoiceProps) => {

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: string | null) => {
    // Предотвращаем всплытие события (чтобы не открывался аккордион)
    event.stopPropagation();

    if (value === null) return;

    switch (value) {
      case 'all':
        onSelectAll();
        break;
      case 'default':
        onSelectDefault();
        break;
      case 'clear':
        onClear();
        break;
    }
  };

  // Определяем активную кнопку
  const activeValue = isAllSelected ? 'all' : isDefaultSelected ? 'default' : null;

  return (
    <ToggleButtonGroup
      size="small"
      sx={{ position: "absolute", top: 10, right: 30 }}
      exclusive
      value={activeValue}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    >
      <ToggleButton value="all" sx={{ m: 0, p: 0.5, fontSize: 10 }}>
        <SelectAllIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
        Все
      </ToggleButton>

      <ToggleButton value="default" sx={{ m: 0, p: 0.5, fontSize: 10 }}>
        <RestartAltIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
        По умолчанию
      </ToggleButton>

      <ToggleButton value="clear" sx={{ m: 0, p: 0.5, fontSize: 10 }}>
        <CleaningServicesIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
        Очистить
      </ToggleButton>
    </ToggleButtonGroup>
  );
};