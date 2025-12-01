import { useAppSelector } from "@store";
import { tasksSelectors } from "@entities/tasks/";
import { TaskLightMacros } from "@feat/light-macros/";

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