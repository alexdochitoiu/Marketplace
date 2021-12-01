import { Dialog, DialogTitle, IconButton, Slide } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const Transition: any = React.forwardRef<any, any>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ({ visible, onClose }) {
  return (
    <Dialog open={visible} TransitionComponent={Transition} onClose={onClose}>
      <DialogTitle>
        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          <h4>Produsul a fost adaugat in cos</h4>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
    </Dialog>
  );
}
