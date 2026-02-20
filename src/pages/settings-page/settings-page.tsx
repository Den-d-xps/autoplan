import { TabsLayout } from "@/shared";
import { Typography } from "@mui/material";
import { DefaultTheatersSelect } from "@feat/default-theaters";


export const SettingsPage = () => {

  const tabsList = [
    {
      label: "Общие",
      element: <DefaultTheatersSelect />,
    }
  ];

  return (
    <TabsLayout tabsList={tabsList} />
  );
};