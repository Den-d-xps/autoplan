import { useAppSelector } from "../../app/providers/store/store";
import { tasksSelectors } from "../../entities/tasks/model/task-slice";
import { TaskLightMacros } from "../../features/light-macros/components/task-light-macros/task-light-macros";

export const TaskList: React.FC = () => {

  const tasks = useAppSelector(tasksSelectors.selectTasks);

  return (
    <>
      {tasks.map((task) => (
        <TaskLightMacros key={task.id} id={task.id} />
      ))}
    </>
  );
};