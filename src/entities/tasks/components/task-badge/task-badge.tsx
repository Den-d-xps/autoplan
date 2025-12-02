import { useAppSelector } from '@store';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { tasksSelectors } from '@entities/tasks';


export const TaskBadge = () => {

  const countTasks = useAppSelector(tasksSelectors.selectTasksLength);

  return (
    <NavLink to="/tasks"> 
      <Badge color="secondary" badgeContent={countTasks} sx={{ mr: 5 }}>
        <FormatListBulletedIcon color="action" />
      </Badge>
    </NavLink>
  )
};