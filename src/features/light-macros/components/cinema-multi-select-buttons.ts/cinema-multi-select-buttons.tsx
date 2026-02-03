import { useAppSelector } from '@/app/providers/store';
import { CinemaMultiSelectButtonsUI } from './cinema-multi-select-buttons-ui';
import type { TCinemaMultiSelectButtonsProps } from './types';
import { userSelectors } from '@/entities/user';


export const CinemaMultiSelectButtons = ({
  selected,                                            // выбранные кинотеатры
  onChange,                                            // callback
}: TCinemaMultiSelectButtonsProps) => {

  const kinoteatrs = useAppSelector(userSelectors.selectTheaters)

  const handleToggle = (cinema: string) => {
    if (selected.includes(cinema)) {
      onChange(selected.filter((x) => x !== cinema));
    } else {
      onChange([...selected, cinema]);
    }
  };

  return (
    <CinemaMultiSelectButtonsUI 
      cinemas={kinoteatrs} 
      selected={selected} 
      onChange={handleToggle} 
      onClear={() => onChange([])}
    />
  );
};
