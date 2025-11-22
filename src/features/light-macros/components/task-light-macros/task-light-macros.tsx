import { useAppSelector } from "../../../../app/providers/store/store";
import { tasksSelectors } from "../../../../entities/tasks/model/task-slice";
import { Status } from "../../../../entities/tasks/model/types";
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