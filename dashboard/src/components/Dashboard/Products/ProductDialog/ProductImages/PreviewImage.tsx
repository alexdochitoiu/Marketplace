import { Avatar, makeStyles } from "@material-ui/core";
import PanoramaIcon from "@material-ui/icons/Panorama";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    border: "1px solid #555",
  },
  removeImageButton: {
    cursor: "pointer",
    width: 15,
    height: 15,
    color: "red",
    position: "absolute",
    top: 2,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
});

interface IProps {
  image: any;
  onRemove: () => void;
}

export default function ({ image, onRemove }: IProps) {
  const isSrc = typeof image === "string";
  const classes = useStyles();
  const [src, setSrc] = React.useState<any>(isSrc ? image : undefined);

  React.useEffect(() => {
    if (!isSrc) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target?.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <div style={{ position: "relative" }}>
      <Avatar
        className={classes.avatar}
        src={src}
        children={<PanoramaIcon />}
      />
      <CancelIcon className={classes.removeImageButton} onClick={onRemove} />
    </div>
  );
}
