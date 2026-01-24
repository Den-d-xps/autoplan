import { useCallback } from "react";
import type { ISidebarItemProps } from "./type";
import { SidebarItemUI } from "./sidebar-item-ui";
import { useAppSelector } from "@/app/providers/store";
import { sidebarSelectors } from "../../model/sidebar-slice";


export const SidebarItem  = ({
  id,
  title,
  icon,
  action,
  selected = false,
  disabled = false,
}: ISidebarItemProps) => {

  const expanded = useAppSelector(sidebarSelectors.selectExpanded);

  const handleClick = useCallback(() => {
    //  onPageItemClick?.(id, false);
 
     switch (action.type) {
       case 'route':
         // навигация произойдёт через Link
         break;
 
       // case 'modal':
       //   modalContext?.openModal(action.modalId);
       //   break;
 
       case 'callback':
         action.onClick();
         break;
     }
   }, [action, id]);
  
  return (
    <SidebarItemUI
      id={id}
      icon={icon}
      title={title}
      action={action}
      selected={selected}
      disabled={disabled}
      expanded={expanded}
      handleClick={handleClick}
    />
  );
}