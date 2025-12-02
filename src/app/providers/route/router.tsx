import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app-layout";
import { 
  LightMacrosPage, 
  InfoPage, 
  SettingsPage, 
  TasksPage 
} from "@pages/";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {path: "/light-macros", element: <LightMacrosPage />},
      {path: "/tasks", element: <TasksPage />},
      {path: "/settings", element: <SettingsPage />},
      {path: "/info", element: <InfoPage />},
      {path: "*", element: <LightMacrosPage />},
    ]
  }
]);