import { useAppDispatch } from "@store";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { tasksActions } from "@entities/tasks/";

export const useTauriEvent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unlistenPromise = listen(
      "macro-progress",
      (event) => {
        const payload = event.payload as {
          progress: number;
          message: string;
          id: string;
          error?: string;
        };

        dispatch(tasksActions.updateProgress({ ...payload }));
      }
    );

    return () => {
      unlistenPromise.then((fn) => fn());
    };
  }, [dispatch]);
};