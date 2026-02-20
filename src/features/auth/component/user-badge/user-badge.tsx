import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { userSelectors } from "@entities/user";
import { openModal } from "@feat/modal";
import { UserBadgeUI } from "./user-badge-ui";

export function UserBadge() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(userSelectors.selectName);
  const avatar = useAppSelector(userSelectors.selectAvatar);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleChipClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuLogoutClick = useCallback(() => {
    handleMenuClose();
    dispatch(openModal('logout-confirm'));
  }, [dispatch, handleMenuClose]);

  return (
    <UserBadgeUI
      name={name}
      avatar={avatar}
      menuOpen={menuOpen}
      anchorEl={anchorEl}
      onChipClick={handleChipClick}
      onMenuClose={handleMenuClose}
      onMenuLogoutClick={handleMenuLogoutClick}
    />
  );
}