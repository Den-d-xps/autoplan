import { CinemaMultiSelectButtonsUI } from './cinema-multi-select-buttons-ui';
import type { TCinemaMultiSelectButtonsProps } from './types';


export const CinemaMultiSelectButtons = ({
  selected,                                            // выбранные кинотеатры
  onChange,                                            // callback
}: TCinemaMultiSelectButtonsProps) => {

  const kinoteatrs = [
    { label: 'ОП01' },
    { label: 'ОП03' },
    { label: 'ОП04' },
    { label: 'ОП05' },
    { label: 'ОП06' },
    { label: 'ОП08' },
    { label: 'ОП09' },
    { label: 'ОП10' },
    { label: 'ОП11' },
    { label: 'ОП12' },
    { label: 'ОП13' },
    { label: 'ОП14' },
    { label: 'ОП16' },
    { label: 'ОП17' },
    { label: 'ОП18' },
    { label: 'ОП19' },
    { label: 'ОП20' },
    { label: 'ОП21' },
    { label: 'ОП22' },
    { label: 'ОП23' },
    { label: 'ОП24' },
    { label: 'ОП25' },
    { label: 'ОП26' },
    { label: 'ОП27' },
    { label: 'ОП28' },
    { label: 'ОП29' },
    { label: 'ОП30' },
    { label: 'ОП31' },
    { label: 'ОП32' },
    { label: 'ОП33' },
    { label: 'ОП34' },
    { label: 'ОП35' },
    { label: 'ОП36' },
    { label: 'ОП37' },
    { label: 'ОП40' },
    { label: 'ОП41' },
    { label: 'ОП43' },
    { label: 'ОП45' },
    { label: 'ОП46' },
    { label: 'ОП47' },
    { label: 'ОП49' },
    { label: 'ОП50' },
    { label: 'ОП52' },
    { label: 'ОП54' },
    { label: 'ОП56' },
    { label: 'ОП58' },
    { label: 'ОП59' },
    { label: 'ОП60' },
    { label: 'ОП61' },
    { label: 'ОП62' },
    { label: 'ОП63' },
    { label: 'ОП64' },
    { label: 'ОП65' },
    { label: 'ОП66' },
    { label: 'ОП67' },
    { label: 'ОП68' },
    { label: 'ОП69' },
    { label: 'ОП70' },
    { label: 'ОП72' },
    { label: 'ОП73' },
    { label: 'ОП74' },
    { label: 'ОП75' },
    { label: 'ОП76' },
    { label: 'ОП79' },
    { label: 'ОП80' },
    { label: 'ОП82' },
    { label: 'ОП83' },
    { label: 'ОП84' },
    { label: 'ОП85' },
    { label: 'ОП87' },
    { label: 'ОП88' }
  ];

  const handleToggle = (cinema: string) => {
    if (selected.includes(cinema)) {
      onChange(selected.filter((x) => x !== cinema));
    } else {
      onChange([...selected, cinema]);
    }
  };

  return (
    <CinemaMultiSelectButtonsUI 
      cinemas={kinoteatrs.map((k) => k.label)} 
      selected={selected} 
      onChange={handleToggle} 
      onClear={() => onChange([])}
    />
  );
};
