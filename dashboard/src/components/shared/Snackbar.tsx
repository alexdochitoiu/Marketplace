import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IProps {
  text: string;
  onClose: () => void;
  severity: Color;
}

export default function ({ text, onClose, severity }: IProps) {
  return text ? (
    <Snackbar open={Boolean(text)} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  ) : null;
}
