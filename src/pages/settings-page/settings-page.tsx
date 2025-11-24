import { useAppDispatch } from "../../app/providers/store/store";
import { tasksActions } from "../../entities/tasks/model/task-slice";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { TaskList } from "../../widgets/task-list/task-list";


export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unlisten = listen("macro-progress", (event) => {
      const payload = event.payload as { progress: number; message: string; id: string; error?: string };
      dispatch(tasksActions.updateProgress({...payload}));
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [dispatch]);

  return (
    <>
      <div>SettingsPage23</div>
      <TaskList />
    </>
  )
};