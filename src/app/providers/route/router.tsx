import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app-layout";
import { LightMacrosPage, InfoPage, SettingsPage } from "@pages/";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {path: "/light-macros", element: <LightMacrosPage />},
      {path: "/settings", element: <SettingsPage />},
      {path: "/info", element: <InfoPage />},
      {path: "*", element: <LightMacrosPage />},
    ]
  }
]);