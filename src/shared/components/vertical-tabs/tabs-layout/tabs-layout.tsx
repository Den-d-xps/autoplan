import { useState } from "react";
import { TabsLayoutUI } from "./tabs-layout-ui";
import type { ITabsLayoutProps } from "./types";
import { Tab } from "@mui/material";
import { TabPanel } from "../tab-panel";

export const TabsLayout = ({ tabsList }: ITabsLayoutProps) => {
  const [value, setValue] = useState(0);
  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsElements = tabsList.map((tab, index) => {
    return (
      <Tab
        id={String(index)}
        label={tab.label}
        sx={{ width: "90%", height: "40px", alignItems: "start" }}
      />
    );
  });

  const tabsPanelElements = tabsList.map((tab, index) => {
    return (
      <TabPanel value={value} index={index}>
        {tab.element}
      </TabPanel>
    );
  });

  return (
    <TabsLayoutUI 
      value={value} 
      handleChange={handleChange}
      tabsElements={tabsElements}
      tabsPanelElements={tabsPanelElements}
    />
  );
};