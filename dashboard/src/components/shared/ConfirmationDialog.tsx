import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  contentText: string;
  confirmButtonText?: string;
  onConfirm: () => void;
}
export default function ({
  open,
  onClose,
  title,
  contentText,
  confirmButtonText,
  onConfirm,
}: IProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {confirmButtonText || "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
