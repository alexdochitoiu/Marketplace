import { Snackbar, Slide, IconButton } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default function ({ open, onClose, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={4000}
      TransitionComponent={TransitionRight}
      action={
        <React.Fragment>
          <IconButton size="small" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
