import { IconButton, makeStyles, Theme } from "@material-ui/core";
import { IImage } from "src/types/IImage";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import clsx from "clsx";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    width: 220,
    height: 200,
    margin: 8,
  },
  image: {
    width: 220,
    height: 200,
    borderRadius: 5,
    background: "#222",
    objectFit: "contain",
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    background: "rgba(255, 255, 255, 0.5)",
    bottom: 0,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

interface IProps {
  image: IImage;
  onDelete: (name: string) => void;
  onClick: () => void;
}

export default function ({ image, onClick, onDelete }: IProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  const handleOpenConfirmation = () => {
    setHover(false);
    setDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setHover(false);
    setDeleteConfirmation(false);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ConfirmationDialog
        open={deleteConfirmation}
        onClose={handleCloseConfirmation}
        title="Sterge imagine"
        contentText="Esti sigur ca vrei sa stergi aceasta imagine?"
        confirmButtonText="Sterge"
        onConfirm={() => {
          handleCloseConfirmation();
          onDelete(image.name);
        }}
      />
      <img
        src={image.src}
        alt={image.name}
        className={classes.image}
        onClick={onClick}
      />
      {hover && (
        <div className={classes.toolbar}>
          <IconButton onClick={handleOpenConfirmation}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
