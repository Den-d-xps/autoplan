import { Box, Divider, Typography } from "@mui/material";
import { LightMacrosForm } from "../../features/light-macros/components/light-macros-form/light-macros-form";
import type { TFormDataWithConvertedTime } from "../../features/light-macros/components/light-macros-form/types";
import { useAppDispatch, useAppSelector } from "../../app/providers/store/store";
import { tasksActions, tasksSelectors } from "../../entities/tasks/model/task-slice";
import { runNextTask } from "../../entities/tasks/model/task-thunks";

// const obj1 = {
//   movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
//   timeValue: {hh: 0, mm: 4, ss: 34},
//   cinemaNumber: "72",
//   position: 'end'
// }

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
      <Typography variant="h3">Light Macros Page</Typography>
      <Divider sx={{ my: 2 }} />
      <LightMacrosForm onSubmit={handleSubmit} />
    </Box>
  );
};