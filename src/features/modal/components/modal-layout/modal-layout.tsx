import { 
  Button,
  Dialog,
  DialogContent, 
  DialogTitle, 
} from "@mui/material";
import type { IModalLayoutProps } from "./types";
import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import { closeModal, selectOpenModalId } from "../../model";
import CloseIcon from '@mui/icons-material/Close';


export const ModalLayout = ({ id, title, children }: IModalLayoutProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpenModalId) === id;
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={false}
        sx={{
          '& .MuiDialog-paper': { width: '80vw' }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, background: '#212121', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {title}
        </DialogTitle>
        <Button
          onClick={handleClose}
          sx={({
            position: 'absolute',
            right: 8,
            top: 8,
          })}
        >
          <CloseIcon />
        </Button>
        <DialogContent dividers>
          {children}
        </DialogContent>
      </Dialog>
  );
}