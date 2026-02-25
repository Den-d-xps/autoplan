export type TToggleButtonsChoiceProps = {
  onSelectAll: () => void;      // Выбрать все кинотеатры
  onSelectDefault: () => void;  // Выбрать кинотеатры по умолчанию
  onClear: () => void;          // Очистить выбор
  isAllSelected: boolean;       // Выбраны ли все кинотеатры
  isDefaultSelected: boolean;   // Выбраны ли кинотеатры по умолчанию
};