export type TUserBadgeUIProps = {
  name: string;
  avatar: string;
  menuOpen: boolean;
  anchorEl: HTMLElement | null;
  onChipClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onMenuLogoutClick: () => void;
};