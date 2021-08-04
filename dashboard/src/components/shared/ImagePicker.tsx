import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { IImage } from "src/types/IImage";
import * as imageService from "src/services/photo";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSelect: (image: IImage) => void;
}

const useStyles = makeStyles({
  image: {
    width: 110,
    height: 100,
    background: "#555",
    objectFit: "contain",
    margin: 5,
    borderRadius: 2,
    opacity: 0.9,
    cursor: "pointer",
    border: "3px solid transparent",
    "&:hover": {
      border: "3px solid orange",
      opacity: 1,
    },
  },
});

export default function ({ open, onClose, onSelect }: IProps) {
  const classes = useStyles();
  const [images, setImages] = React.useState<IImage[]>([]);

  React.useEffect(() => {
    imageService.getAll().then(({ data }) => {
      setImages(data.images);
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select image</DialogTitle>
      <DialogContent>
        <Grid>
          {images.map((image) => (
            <img
              key={image.name}
              src={image.src}
              className={classes.image}
              onClick={() => onSelect(image)}
            />
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
