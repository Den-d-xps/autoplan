import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { TUserBadgeUIProps } from "./types";

export const UserBadgeUI: React.FC<TUserBadgeUIProps> = ({
  name,
  avatar,
  menuOpen,
  anchorEl,
  onChipClick,
  onMenuClose,
  onMenuLogoutClick,
}) => {
  return (
    <>
      <Chip
        avatar={
          <Avatar src={avatar} alt={name} sx={{width: '200px'}} >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        label={name}
        variant="outlined"
        onClick={onChipClick}
        aria-controls={menuOpen ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        sx={{
          p: 2,
          // width: '100px',
        }}
      />
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={onMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onMenuLogoutClick}>Выйти</MenuItem>
      </Menu>
    </>
  );
};