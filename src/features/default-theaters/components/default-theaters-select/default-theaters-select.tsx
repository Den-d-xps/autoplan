import { useAppDispatch, useAppSelector } from '@store';
import { userSelectors } from '@entities/user';
import { settingsActions, settingsSelectors } from '@entities/settings';
import { DefaultTheatersSelectUI } from './default-theaters-select-ui';


export const DefaultTheatersSelect = () => {
  const dispatch = useAppDispatch();
  const allTheaters = useAppSelector(userSelectors.selectTheaters);
  const defaultTheaters = useAppSelector(settingsSelectors.selectTheaters);

  const allCinemaNumbers = allTheaters.map((t) => t.slice(2));

  const handleToggle = (cinema: string) => {
    const updated = defaultTheaters.includes(cinema)
      ? defaultTheaters.filter((x) => x !== cinema)
      : [...defaultTheaters, cinema];
    dispatch(settingsActions.setTheaters(updated));
  };

  const handleSelectAll = () => {
    dispatch(settingsActions.setTheaters(allCinemaNumbers));
  };

  const handleClear = () => {
    dispatch(settingsActions.setTheaters([]));
  };

  return (
    <DefaultTheatersSelectUI
      cinemas={allTheaters}
      selected={defaultTheaters}
      onChange={handleToggle}
      onSelectAll={handleSelectAll}
      onClear={handleClear}
    />
  );
};