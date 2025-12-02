import { Box, Divider, Typography } from "@mui/material";
import { TaskList } from "@widgets/";


export const TasksPage = () => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Typography variant="h3" color="primary" sx={{ textTransform: "uppercase" }} >Список задач</Typography>
      <Divider sx={{ my: 2 }} />
      <TaskList />
    </Box>
  )
};