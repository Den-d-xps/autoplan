import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/providers/store/store";
import { tasksActions, tasksSelectors } from "../../entities/tasks/model/task-slice";
import { runNextTask } from "../../entities/tasks/model/task-thunks";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { TaskLightMacros } from "../../features/light-macros/components/task-light-macros/task-light-macros";
import { TaskList } from "../../widgets/task-list/task-list";

const obj1 = {
  movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
  timeValue: {hh: 0, mm: 4, ss: 34},
  cinemaNumber: "72",
  position: 'end'
}
const obj2 = {
  movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
  timeValue: {hh: 0, mm: 4, ss: 34},
  cinemaNumber: "73",
  position: 'start'
}

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const isRunningQueue = useAppSelector(tasksSelectors.selectIsRunning);
  const [ text, setText ] = useState("");

  useEffect(() => {
    const unlisten = listen("macro-progress", (event) => {
      const payload = event.payload as { progress: number; message: string; id: string };
      dispatch(tasksActions.updateProgress({...payload}));
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [dispatch]);

  const handleClick = () => {

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

      <TaskList />
    </>
  )
};