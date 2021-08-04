import { Avatar, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import clsx from "clsx";
import PreviewImage from "./PreviewImage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  addImage: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },
});

interface IProps {
  images: any[];
  onAddImages: (image: any[]) => void;
  onRemoveImage: (index: number) => void;
}

export default function ({ images, onAddImages, onRemoveImage }: IProps) {
  const uploadImage = React.useRef<HTMLInputElement | null>(null);
  const classes = useStyles();

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      onAddImages(files);
    }
  };

  return (
    <div className={classes.root}>
      {images.map((i, idx) => (
        <PreviewImage key={idx} image={i} onRemove={() => onRemoveImage(idx)} />
      ))}
      <input
        multiple={true}
        accept="image/*"
        style={{ display: "none" }}
        name="image"
        type="file"
        ref={uploadImage}
        onChange={handleImageChange}
      />
      {images.length < 4 && (
        <Avatar
          className={clsx(classes.avatar, classes.addImage)}
          children={<AddIcon style={{ width: 45, height: 45 }} />}
          onClick={() => uploadImage?.current?.click()}
        />
      )}
    </div>
  );
}
