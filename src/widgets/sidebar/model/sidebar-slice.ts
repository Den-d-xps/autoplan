import { createSlice } from '@reduxjs/toolkit';
import type { SidebarState } from './types';
import { MainItems, NestedItems } from './menu-config';


const initialState: SidebarState = {
  expanded: true,
  mini: false,
  listMainItems: MainItems,
  listNestedItems: NestedItems,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleExpanded(state) {
      state.expanded = !state.expanded;
    },
  },
  selectors: {
    selectExpanded: (state) => state.expanded,
    selectMini: (state) => state.mini,
    selectListMainItems: (state) => state.listMainItems,
    selectListNestedItems: (state) => state.listNestedItems,
  },
});

export const { toggleExpanded } = sidebarSlice.actions;
export const sidebarSelectors = sidebarSlice.selectors;
