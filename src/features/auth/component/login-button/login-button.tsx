import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../app/providers/store/store";
import { handleLogin } from "../../model/thunks";


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