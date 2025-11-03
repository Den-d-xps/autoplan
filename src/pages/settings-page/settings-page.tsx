import { Button } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";

export const SettingsPage = () => {
  const handleClick = async () => {
  console.log("click");
  const obj = {
      movieName: "Afterburn_FTR-2_S_EN-XX_INT_51_4K_INDI_20250319_DL",
      timeValue: {hh: 0, mm: 4, ss: 24},
      cinemaNumber: "72",
    }
  try {
    const res = await invoke("set_light_macros", obj);
    console.log("invoke result:", res);
  } catch (e) {
    console.error("invoke error:", e);
  }
  console.log("after click");
};
  return (
    <>
      <div>SettingsPage23</div>
      <Button
        onClick={() => handleClick()}
        variant="contained"
        color="secondary"
      >
        КНОПКА
      </Button>
    </>
  )
};