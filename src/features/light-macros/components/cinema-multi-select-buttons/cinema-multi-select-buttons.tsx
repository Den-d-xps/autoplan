import { useAppSelector } from '@/app/providers/store';
import { CinemaMultiSelectButtonsUI } from './cinema-multi-select-buttons-ui';
import type { TCinemaMultiSelectButtonsProps } from './types';
import { userSelectors } from '@/entities/user';
import { settingsSelectors } from '@/entities/settings';


export const CinemaMultiSelectButtons = ({
  selected,                                            // выбранные кинотеатры
  onChange,                                            // callback
}: TCinemaMultiSelectButtonsProps) => {

  const kinoteatrs = useAppSelector(userSelectors.selectTheaters);
  const defaultTheaters = useAppSelector(settingsSelectors.selectTheaters);
  
  // Извлекаем номера кинотеатров (убираем "оп" в начале)
  const allCinemaNumbers = kinoteatrs.map(cinema => cinema.slice(2));

  const handleToggle = (cinema: string) => {
    if (selected.includes(cinema)) {
      onChange(selected.filter((x) => x !== cinema));
    } else {
      onChange([...selected, cinema]);
    }
  };

  const handleSelectAll = () => {
    onChange(allCinemaNumbers);
  };

  const handleSelectDefault = () => {
    onChange(defaultTheaters);
  };

  const handleClear = () => {
    onChange([]);
  };

  // Проверяем, выбраны ли все кинотеатры
  const isAllSelected = selected.length === allCinemaNumbers.length &&
    allCinemaNumbers.every(cinema => selected.includes(cinema));

  // Проверяем, выбраны ли кинотеатры по умолчанию
  const isDefaultSelected = selected.length === defaultTheaters.length &&
    defaultTheaters.every(theater => selected.includes(theater)) &&
    selected.every(theater => defaultTheaters.includes(theater));

  return (
    <CinemaMultiSelectButtonsUI
      cinemas={kinoteatrs}
      selected={selected}
      onChange={handleToggle}
      onClear={handleClear}
      onSelectAll={handleSelectAll}
      onSelectDefault={handleSelectDefault}
      isAllSelected={isAllSelected}
      isDefaultSelected={isDefaultSelected}
    />
  );
};
