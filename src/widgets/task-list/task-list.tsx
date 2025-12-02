import { useAppSelector } from "@store";
import { tasksSelectors } from "@entities/tasks/";
import { TaskLightMacros } from "@feat/light-macros/";
import { Box, Typography } from "@mui/material";

export const TaskList: React.FC = () => {

  const tasks = useAppSelector(tasksSelectors.selectTasks);

  return (
    <> 
      {
        tasks.length === 0 
        ? (
          <Box sx={{ textAlign: "center" }} > 
            <Typography sx={{ fontSize: 50 }}>•••</Typography>
            <Typography variant="h5">Нет задач</Typography>
          </Box>
        )
        : tasks.map((task) => (
          <TaskLightMacros key={task.id} id={task.id} />
        ))
      }
    </>
  );
};