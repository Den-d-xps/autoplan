import { useCallback } from "react";
import type { ISidebarItemProps } from "./type";
import { SidebarItemUI } from "./sidebar-item-ui";
import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import { sidebarSelectors } from "../../model/sidebar-slice";
import { openModal } from "@feat/modal";


export const SidebarItem  = ({
  id,
  title,
  icon,
  action,
  selected = false,
  disabled = false,
}: ISidebarItemProps) => {

  const expanded = useAppSelector(sidebarSelectors.selectExpanded);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
     switch (action.type) {
       case 'route':
         // навигация произойдёт через Link
         break;
 
       case 'modal':
         dispatch(openModal(action.modalId));
         break;
 
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