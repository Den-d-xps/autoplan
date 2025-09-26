import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app-layout";
import { LightMacrosPage } from "../../../pages/light-macros-page/light-macros- page";
import { InfoPage } from "../../../pages/info-page/info-page";
import { SettingsPage } from "../../../pages/settings-page/settings-page";


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