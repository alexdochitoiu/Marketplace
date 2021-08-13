import { Avatar, Dialog, makeStyles } from "@material-ui/core";
import React from "react";
import PanoramaIcon from "@material-ui/icons/Panorama";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  avatar: {
    cursor: "pointer",
    width: 150,
    height: 150,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    border: "1px solid transparent",
    "&:hover": {
      borderColor: "#bbb",
      boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.2)",
    },
  },
  openedImage: {
    background: "#222",
    objectFit: "contain",
    overflow: "hidden",
  },
});

interface IProps {
  images: string[];
}

export default function ({ images }: IProps) {
  const classes = useStyles();
  const [openedImage, setOpenedImage] = React.useState("");
  return (
    <div className={classes.root}>
      <Dialog open={Boolean(openedImage)} onClose={() => setOpenedImage("")}>
        {openedImage && (
          <img src={openedImage} className={classes.openedImage} />
        )}
      </Dialog>
      {images.map((img, index) => (
        <Avatar
          key={index}
          className={classes.avatar}
          src={img}
          children={<PanoramaIcon />}
          onClick={() => setOpenedImage(img)}
        />
      ))}
    </div>
  );
}
