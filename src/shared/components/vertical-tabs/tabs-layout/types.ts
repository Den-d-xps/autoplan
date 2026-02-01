import type React from "react";

export type TTabs = {
  label: string;
  element: React.ReactNode;
}

export interface ITabsLayoutProps {
  tabsList: TTabs[]
};

export interface ITabsLayoutUIProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabsElements: React.ReactNode[];
  tabsPanelElements: React.ReactNode[];
};