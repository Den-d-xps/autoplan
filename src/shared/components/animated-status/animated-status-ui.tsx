import { Box, Typography } from "@mui/material"
import type { IAnimatedStatusUIProps } from "./types"


export const AnimatedStatusUI = ({
  prev_message,
  current_message,
  animationDuration
}: IAnimatedStatusUIProps) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "20px",
        position: "relative",
        '@keyframes slideOutUp': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
        '@keyframes slideInUp': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      }}
    >
      {prev_message && (
        <Typography
          variant="body2"
          color="primary"
          sx={{
            position: "absolute",
            whiteSpace: "nowrap",
            animation: `slideOutUp ${animationDuration}ms ease-in forwards`,
          }}
        >
          {prev_message}
        </Typography>
      )}
      <Typography
        variant="body2"
        color="primary"
        sx={{
          whiteSpace: "nowrap",
          animation: prev_message ? `slideInUp ${animationDuration}ms ease-out` : "none",
        }}
      >
        {current_message}
      </Typography>
    </Box>
  )
}