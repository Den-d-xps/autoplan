import { useAppSelector } from "@store";
import { tasksSelectors, Status } from "@entities/tasks/";
import { TaskLightMacrosUI } from "./task-light-macros-ui";

export type TTaskLightMacrosProps = {
  id: string
}


export const TaskLightMacros: React.FC<TTaskLightMacrosProps> = ({id}) => {

  const task = useAppSelector((state) => tasksSelectors.selectTaskById(state)(id));

  return (
    <TaskLightMacrosUI
      cinemaName={task?.payload?.movieName || ""}
      cinemaNumber={task?.payload?.cinemaNumber || 0}
      status={task?.status || Status.pending}
      progress={task?.progress || 0}
      message={task?.message || ""}
      error={task?.error}
   />
  )
};