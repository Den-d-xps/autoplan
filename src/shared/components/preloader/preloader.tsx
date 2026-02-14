import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AnimatedStatus, CustomProgress } from "@/shared";
import type { IPreloaderProps } from "./types";


export const Preloader = ({
  progress,
  statusMessage,
  error,
  onReinit,
  visible,
}: IPreloaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
        backgroundColor: '#212121',
        opacity: visible ? "1" : "0",
        transition: visible 
          ? 'opacity 1.6s ease-in-out' 
          : 'opacity 1.6s ease-in-out 1s, z-index 0s 2.6s',
        position: 'absolute',
        zIndex: visible ? "10000" : "0"
      }}
    >
      
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700, letterSpacing: 13 }}>
        AUTOPLAN
      </Typography>

      <Box sx={{ width: "400px" }}>
        <CustomProgress value={progress} />
      </Box>

      <Box 
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "350px",
          overflow: 'hidden',
          maxHeight: !error ? '100%' : '0%',
          transition: 'max-height 1s ease-in-out',
        }}
      >
        <Box 
          sx={{
            '@keyframes blink': {
                '0%, 50%': {
                  opacity: 1
                },
                '51%, 100%': {
                  opacity: 0
                }
            },
            '@keyframes textGlow': {
              '0%, 100%': {
                opacity: 0.7,
                textShadow: '0 0 8px rgba(139, 92, 246, 0.3)'
              },
              '50%': {
                opacity: 1,
                textShadow: '0 0 16px rgba(139, 92, 246, 0.6)'
              },
              height: '100%'
            },
          }}  
        >
          <Typography component='span' variant="body2" color="text.secondary" sx={{ animation: 'textGlow 1s ease-in-out infinite'}}>
            Инициализация
          </Typography>
          <Box component='span' sx={{ animation: 'blink 1.4s infinite 0s' }}>.</Box>
          <Box component='span' sx={{ animation: 'blink 1.4s infinite 0.3s' }}>.</Box>
          <Box component='span' sx={{ animation: 'blink 1.4s infinite 0.6s' }}>.</Box>
        </Box>
        <AnimatedStatus message={statusMessage} />
      </Box>

      {/* {error && ( */}
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 1,
            overflow: 'hidden',
            maxHeight: error ? '100%' : '0%',
            transition: 'max-height 1s ease-in-out', 
          }}
        >
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Button variant="contained" color="secondary" onClick={onReinit}>
            REINIT
          </Button>
        </Box>
      {/* )} */}

    </Box>
  );
};