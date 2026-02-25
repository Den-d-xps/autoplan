import { 
  Avatar, 
  Box, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography 
} from "@mui/material";
import { Link } from "react-router-dom";
import type { ISidebarItemUIProps } from "./type";


export const SidebarItemUI = ({
  id,
  icon,
  title,
  action,
  selected,
  disabled,
  expanded,
  handleClick,
}: ISidebarItemUIProps) => {
  return (
    <ListItem
      key={id}
      disablePadding
      sx={{
        display: 'block',
        py: 0,
        px: 1,
        overflowX: 'hidden',
      }}
    >
      <ListItemButton
        selected={selected}
        disabled={disabled}
        onClick={handleClick}
        component={action.type === 'route' ? Link : 'div'}
        {...(action.type === 'route' ? { to: action.to } : {})}
        sx={{
          height: expanded ? 'auto' : 50,
        }}
      >
        <Box
          sx={
            !expanded
              ? {
                  position: 'absolute',
                  left: '50%',
                  top: 'calc(50% - 6px)',
                  transform: 'translate(-50%, -50%)',
                }
              : {}
          }
        >
          <ListItemIcon
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: expanded ? 'auto' : 'center',
                }}
              >
                {icon ?? null}
                {!icon && !expanded ? (
                  <Avatar
                    sx={{
                      fontSize: 10,
                      height: 16,
                      width: 16,
                    }}
                  >
                    {title
                      .split(' ')
                      .slice(0, 2)
                      .map((titleWord) => titleWord.charAt(0).toUpperCase())}
                  </Avatar>
                ) : null}
          </ListItemIcon>
            {!expanded ? (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: -18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  fontWeight: 500,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 90 - 28,
                }}
              >
                {title}
              </Typography>
            ) : null}
        </Box>
        {expanded ? (
            <ListItemText
              primary={title}
              sx={{
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}
            />
        ) : null}
      </ListItemButton>
    </ListItem>
  );
}