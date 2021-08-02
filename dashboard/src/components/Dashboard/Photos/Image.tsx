import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { IImage } from "src/types/IImage";

const useStyles = makeStyles({
  image: {
    background: "#222",
    objectFit: "contain",
  },
  imageThumbnail: {
    width: 220,
    height: 200,
    margin: 3,
    borderRadius: 5,
    padding: 2,
    cursor: "pointer",
    border: "1px solid transparent",
    "&:hover": {
      opacity: 0.8,
      border: "1px solid #bbb",
    },
  },
  imageFullscreen: {
    overflow: "hidden",
  },
});

interface IProps {
  image: IImage;
  variant: "fullscreen" | "thumbnail";
  onClick?: () => void;
}

export default function ({ image, variant, onClick }: IProps) {
  const classes = useStyles();
  return (
    <img
      src={image.src}
      alt={image.name}
      className={clsx(
        classes.image,
        variant === "thumbnail"
          ? classes.imageThumbnail
          : classes.imageFullscreen
      )}
      onClick={onClick}
    />
  );
}
