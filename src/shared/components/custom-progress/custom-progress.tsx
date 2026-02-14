import { Box } from "@mui/material"
import type { ICustomProgressProps } from "./types"


export const CustomProgress = ({
  value,
  height = 10
}: ICustomProgressProps) => {
  return (
    <Box 
      sx={{
        position: 'relative',
        height: `${height}px`,
        background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box
        sx={{
          width: `calc(${value}% - 4px)`,
          transition: 'width 1s ease-in-out',
          position: 'absolute',
          top: '2px',
          left: '2px',
          height: 'calc(100% - 4px)',
          background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899)',
          borderRadius: '14px',
          boxShadow: '0 0 12px rgba(124, 58, 237, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          '@keyframes colorShift': {
            '0%': {
              filter: 'brightness(1)'
            },
            '33%': {
              filter: 'brightness(1.1)'
            },
            '66%': {
              filter:'brightness(0.9)'
            },
            '100%': {
              filter: 'brightness(1)'
            },
          },
          animation: 'colorShift 3s linear infinite'
        }}   
      >
      </Box>
    </Box>
  )
}