import { Button } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";

export function LoginButton() {
  const handleLogin = async () => {
    await invoke("launch_login_browser");
  };

  return (
    <Button 
      onClick={handleLogin}
      variant="contained"
      color="secondary"
      
    >
    Войти
    </Button>
  );
}