export type TDefaultTheatersSelectUIProps = {
  cinemas: string[];
  selected: string[];
  onChange: (cinema: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
};