import { PageLayout } from "@/shared/components";
import { TaskList } from "@widgets/";


export const TasksPage = () => {
  return (
    <PageLayout title="Список задач">
      <TaskList />
    </PageLayout>
  )
};