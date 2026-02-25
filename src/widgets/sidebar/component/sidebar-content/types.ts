import type { JSX } from "react";


export interface ISidebarContentUIProps {
  mainListElements: (JSX.Element | null)[];
  nestedListElements: (JSX.Element | null)[];
  expanded: boolean;
}