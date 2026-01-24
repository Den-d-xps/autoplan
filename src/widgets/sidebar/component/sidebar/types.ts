export interface ISidebarUIProps {
  expanded: boolean;
  getDrawerSx: () => any;
  onClose: () => void;
}

export interface ISidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}