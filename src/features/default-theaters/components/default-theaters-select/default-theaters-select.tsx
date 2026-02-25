import { useAppDispatch, useAppSelector } from '@store';
import { userSelectors } from '@entities/user';
import { settingsActions, settingsSelectors, saveSettings } from '@entities/settings';
import { DefaultTheatersSelectUI } from './default-theaters-select-ui';


export const DefaultTheatersSelect = () => {
  const dispatch = useAppDispatch();
  const allTheaters = useAppSelector(userSelectors.selectTheaters);
  const defaultTheaters = useAppSelector(settingsSelectors.selectTheaters);

  const allCinemaNumbers = allTheaters.map((t) => t.slice(2));

  const handleToggle = async (cinema: string) => {
    const updated = defaultTheaters.includes(cinema)
      ? defaultTheaters.filter((x) => x !== cinema)
      : [...defaultTheaters, cinema];
    dispatch(settingsActions.setTheaters(updated));
    await saveSettings({ main: { theaters: updated } });
  };

  const handleSelectAll = async () => {
    dispatch(settingsActions.setTheaters(allCinemaNumbers));
    await saveSettings({ main: { theaters: allCinemaNumbers } });
  };

  const handleClear = async () => {
    dispatch(settingsActions.setTheaters([]));
    await saveSettings({ main: { theaters: [] } });
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