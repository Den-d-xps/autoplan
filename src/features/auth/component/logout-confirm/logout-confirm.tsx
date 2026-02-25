import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { useAppDispatch } from "@store";
import { closeModal } from "@feat/modal";
import { handleLogout } from "@feat/auth";

export const LogoutConfirm = () => {
  const dispatch = useAppDispatch();

  const handleNo = () => {
    dispatch(closeModal());
  };

  const handleYes = () => {
    dispatch(handleLogout());
  };

  return (
    <>
      <DialogContentText>
        Вы уверены, что хотите разлогиниться и выйти из приложения?
      </DialogContentText>
      <DialogActions sx={{ px: 0, pb: 0, pt: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleNo}>Нет</Button>
        <Button variant="contained" color="secondary" onClick={handleYes}>Да</Button>
      </DialogActions>
    </>
  );
};