import { Dialog, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ReactImageMagnify from "react-image-magnify";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";

const useStyles = makeStyles({
  image: {
    objectFit: "contain",
  },
  nav: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 620,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& > div": {
      display: "flex",
      cursor: "pointer",
      opacity: 0.5,
      transition: "all 0.2s ease-in",
      "&:hover": {
        background: "#eee",
        opacity: 1,
      },
      "& > img": {
        objectFit: "contain",
      },
    },
  },
  active: {
    opacity: "1 !important",
    background: "#eee",
  },
  overflow: {
    overflow: "hidden",
  },
});

interface IProps {
  images: string[];
}

export default function ({ images }: IProps) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [fullscreen, setFullscreen] = React.useState("");
  const windowSize = useWindowDimensions();
  return (
    <div>
      <Dialog
        open={!!fullscreen}
        fullWidth={true}
        onClose={() => setFullscreen("")}
        // classes={{ paper: classes.overflow }}
      >
        <IconButton
          color="primary"
          size="small"
          onClick={() => setFullscreen("")}
          style={{ position: "absolute", top: 5, right: 5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <img src={fullscreen} className={classes.image} />
      </Dialog>
      {/* <ReactImageMagnify
        smallImage={{
          src: images[index],
          width: 600,
          height: 650,
        }}
        largeImage={{ src: images[index], width: 1200, height: 1300 }}
        imageClassName={classes.image}
        enlargedImageClassName={classes.image}
        enlargedImageContainerStyle={{ background: "#fff", zIndex: 1000 }}
      /> */}
      <img
        className={`${classes.image} animate__animated animate__fadeIn product-selected-image`}
        src={images[index]}
        width={600}
        height={650}
        style={{ cursor: "zoom-in", display: "flex", margin: "0 auto" }}
        onClick={() => setFullscreen(images[index])}
      />
      <div className={`${classes.nav} product-images-nav`}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={idx === index ? classes.active : ""}
            onClick={() => {
              setIndex(idx);
            }}
            style={{
              width: `${100 / images.length}%`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={img} width="100%" height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
