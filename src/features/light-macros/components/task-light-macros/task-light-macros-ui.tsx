import { Avatar, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  LinearProgress, 
  Typography 
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WbIncandescent from "@mui/icons-material/WbIncandescent";
import { Status } from "@entities/tasks";
import type { TTaskLightMacrosPropsUI } from "./types";
import type React from "react";


export const TaskLightMacrosUI: React.FC<TTaskLightMacrosPropsUI> = ({
  cinemaName, 
  cinemaNumber, 
  status, 
  progress, 
  message,
  error
}) => {

  const statusChipMap: Record<Status, React.ReactNode> = {
    [Status.pending]: <Chip icon={<HourglassEmptyIcon />} label="Ожидает" color="default" />,
    [Status.running]: <Chip icon={<PlayArrowIcon />} variant="outlined" label="В процессе" color="primary" />,
    [Status.finished]: <Chip icon={<CheckCircleIcon />} label="Готово" color="success" />,
    [Status.error]: <Chip icon={<ErrorIcon />} label="Ошибка" color="error" />,
  };

  const progressColorMap: Record<Status, "error" | "inherit" | "primary" | "success" >  = {
    [Status.pending]: "inherit",
    [Status.running]: "primary",
    [Status.finished]: "success",
    [Status.error]: "error",
  };

  return (
    <Card sx={{ mt: 2, p: 2, pt: 3, position: "relative"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main", height: 35, width: 35, fontSize: 14 }} >
            {cinemaNumber}
          </Avatar>
        }
        title={cinemaName}
        slotProps={{ title: { align: "left" } }}   
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progressColorMap[status]}
            sx={{ height: 3, borderRadius: 2, m: 1, flexGrow: 1 }}
          />
          {statusChipMap[status]}          
        </Box>
        <Box display="flex" >
          {status === Status.error 
          ? <Typography variant="caption" color="error">`Ошибка: {error}`</Typography> 
          : <Typography variant="caption" color="inherit">{message}</Typography>}
        </Box>
      </CardContent>
      <Chip 
        label="Метка света" 
        size="small" 
        variant="outlined" 
        color="warning" 
        icon={<WbIncandescent />} 
        sx={{ position: "absolute", top: 5, right: 5  }} 
      />
    </Card>
  );
};
