import { Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { handleLogin } from "@feat/auth/";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { userActions } from "@/entities/user";


export function LoginButton() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unlistenPromise = listen(
      "theaters_list",
      (event) => {
        const payload = event.payload as string[];
        const theaters = payload.map((number) => (`ОП${number}`));
        dispatch(userActions.set_theaters(theaters));
      }
    );

    return () => {
      unlistenPromise.then((fn) => fn());
    };
  }, [dispatch]);

  return (
    <Button 
      onClick={() => dispatch(handleLogin())}
      variant="contained"
      color="secondary"
    >
    Войти
    </Button>
  );
}