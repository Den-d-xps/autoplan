import { TabsLayout } from "@/shared";
import { Typography } from "@mui/material";


export const SettingsPage = () => {

  const tabsList = [
    {
      label: "Общие",
      element: <Typography>Общие</Typography>,
    },
    {
      label: "Не общие",
      element: <Typography>Не общие</Typography>,
    },
    {
      label: "Всякие",
      element: <Typography>Всякие</Typography>,
    },
  ];

  return (
    <TabsLayout tabsList={tabsList} />
  );
};