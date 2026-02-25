import { useAppDispatch, useAppSelector } from "@store";
import { tasksSelectors, tasksActions, Status } from "@entities/tasks/";
import { TaskLightMacros } from "@feat/light-macros/";
import { Box, Button, Stack, Typography } from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelectors.selectTasks);

  const hasCompleted = tasks.some(
    (task) => task.status === Status.finished || task.status === Status.error
  );
  const hasSuccessful = tasks.some((task) => task.status === Status.finished);

  return (
    <Box sx={{  }}>
      {tasks.length > 0 && (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: 10,
            right: 20,
            zIndex: 10000,
          }}
        >
          <Button
            variant="text"
            size="small"
            disabled={!hasCompleted}
            startIcon={<CleaningServicesIcon sx={{ fontSize: 14 }} />}
            onClick={() => dispatch(tasksActions.clearCompleted())}
            sx={{ minWidth: "auto", px: 0.8, py: 0.2, fontSize: 11 }}
          >
            Очистить все
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={!hasSuccessful}
            startIcon={<DoneAllIcon sx={{ fontSize: 14 }} />}
            onClick={() => dispatch(tasksActions.clearSuccessful())}
            sx={{ minWidth: "auto", px: 0.8, py: 0.2, fontSize: 11 }}
          >
            Очистить удачные
          </Button>
        </Stack>
      )}
      {tasks.length === 0
        ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 50 }}>•••</Typography>
            <Typography variant="h5">Нет задач</Typography>
          </Box>
        )
        : tasks.map((task) => (
          <TaskLightMacros key={task.id} id={task.id} />
        ))
      }
    </Box>
  );
};
