export type TSidebarItemAction =
  | { type: 'route'; to: string }
  | { type: 'modal'; modalId: string }
  | { type: 'callback'; onClick: () => void };

export interface MenuItem {
  id: string;
  title: string;
  action: TSidebarItemAction;
}

export interface SidebarState {
  expanded: boolean;
  mini: boolean;
  listMainItems: MenuItem[];
  listNestedItems: MenuItem[];
}