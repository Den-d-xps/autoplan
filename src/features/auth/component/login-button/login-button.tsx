import { Button } from "@mui/material";
import { useAppDispatch } from "@store";
import { handleLogin } from "@feat/auth/";


export function LoginButton() {
  const dispatch = useAppDispatch();

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