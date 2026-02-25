export type TSidebarItemAction =
  | { type: 'route'; to: string }
  | { type: 'modal'; modalId: string }
  | { type: 'callback'; onClick: () => void };

export interface ISidebarItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: TSidebarItemAction;
  selected?: boolean;
  disabled?: boolean;
}

export interface ISidebarItemUIProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: TSidebarItemAction;
  selected?: boolean;
  disabled?: boolean;
  expanded: boolean;
  handleClick: () => void;
}