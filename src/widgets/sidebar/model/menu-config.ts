import type { MenuItem } from "./types";

export const MainItems: MenuItem[] = [
   {
    id: 'light-macros',
    title: 'Метки света',
    action: { type: 'route', to: '/light-macros' },
  }
];

export const NestedItems: MenuItem[] = [
  {
    id: 'settings',
    title: 'Настройки',
    action: { type: 'modal', modalId: 'settings' },
  },
  {
    id: 'info',
    title: 'О программе',
    action: { type: 'modal', modalId: 'info' },
  },
];