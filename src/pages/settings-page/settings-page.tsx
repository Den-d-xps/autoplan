import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/providers/store/store";
import { tasksActions, tasksSelectors } from "../../entities/tasks/model/task-slice";
import { runNextTask } from "../../entities/tasks/model/task-thunks";


export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const isRunningQueue = useAppSelector(tasksSelectors.selectIsRunning);

  const handleClick = () => {

  const obj1 = {
    movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
    timeValue: {hh: 0, mm: 4, ss: 14},
    cinemaNumber: "72",
    position: 'start'
  }
  const obj2 = {
    movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
    timeValue: {hh: 0, mm: 4, ss: 14},
    cinemaNumber: "73",
    position: 'end'
   }

    dispatch(tasksActions.addTask({ script: "set_light_macros", payload: obj1}));
    dispatch(tasksActions.addTask({ script: "set_light_macros", payload: obj2}));

    if (!isRunningQueue) {
      dispatch(runNextTask());
    }
};
  return (
    <>
      <div>SettingsPage23</div>
      <Button
        onClick={() => handleClick()}
        variant="contained"
        color="secondary"
      >
        КНОПКА
      </Button>
    </>
  )
};