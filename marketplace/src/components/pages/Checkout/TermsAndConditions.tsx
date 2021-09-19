import {
  FormControlLabel,
  Checkbox,
  makeStyles,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import React from "react";
import { GrClose } from "react-icons/gr";

const useStyles = makeStyles({
  root: {
    background: "transparent !important",
    "& > span": {
      lineHeight: 1,
    },
  },
  label: { fontSize: 12, textTransform: "none", lineHeight: 1 },
  link: {
    fontWeight: "bold",
    color: "#555",
    "&:hover": {
      color: "var(--primary)",
    },
  },
  title: {
    position: "relative",
    padding: 20,
    fontSize: 24,
    textAlign: "center",
    color: "#444",
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    right: 15,
    top: 15,
    stroke: "#444",
    background: "#fff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      "& > path": {
        stroke: "#fff",
      },
      background: "var(--primary)",
    },
  },
});

export default function ({ value, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
        <h4 className={classes.title}>
          <GrClose className={classes.closeIcon} onClick={handleClose} />
          Termenii şi condiţiile
        </h4>
        <DialogContent style={{ borderTop: "1px solid #ddd" }}>
          {/* TO DO: add content here */}
          Termenii şi condiţiile
        </DialogContent>
      </Dialog>
      <FormControlLabel
        className={classes.root}
        control={
          <Checkbox
            checked={value}
            onChange={onChange}
            size="small"
            name="terms"
            color="primary"
          />
        }
        label={
          <span className={classes.label}>
            Am citit şi sunt de acord cu{" "}
            <a onClick={handleClick} className={classes.link}>
              Termenii şi condiţiile
            </a>{" "}
            magazinului online *
          </span>
        }
      />
    </>
  );
}
