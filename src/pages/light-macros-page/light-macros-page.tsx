import { Box, Divider, Typography } from "@mui/material";
import { LightMacrosForm } from "@feat/light-macros/";
import type { TFormDataWithConvertedTime } from "@feat/light-macros/";
import { useAppDispatch, useAppSelector } from "@store";
import { tasksActions, tasksSelectors, runNextTask } from "@entities/tasks/";


export const LightMacrosPage = () => {
  const dispatch = useAppDispatch();
  const isRunningQueue = useAppSelector(tasksSelectors.selectIsRunning);

  const handleSubmit = (data: TFormDataWithConvertedTime) => {
    data.cinemas.map((cinema) => {
      const taskPauload = {
        movieName: data.cplName,
        timeValue: data.time,
        cinemaNumber: cinema,
        position: data.position
      };

    dispatch(tasksActions.addTask({ script: "set_light_macros", payload: taskPauload}));
    });

    if (!isRunningQueue) {
      dispatch(runNextTask());
    }
  }

  return (
    <Box sx={{ textAlign: "start" }}>
      <Typography variant="h3" color="primary" sx={{ textTransform: "uppercase" }}>установка меток света</Typography>
      <Divider sx={{ my: 2 }} />
      <LightMacrosForm onSubmit={handleSubmit} />
    </Box>
  );
};