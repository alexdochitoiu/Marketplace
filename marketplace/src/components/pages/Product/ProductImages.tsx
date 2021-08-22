import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactImageMagnify from "react-image-magnify";

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
});

interface IProps {
  images: string[];
}

export default function ({ images }: IProps) {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <ReactImageMagnify
        smallImage={{ src: images[index], width: 600, height: 650 }}
        largeImage={{ src: images[index], width: 1200, height: 1300 }}
        imageClassName={classes.image}
        enlargedImageClassName={classes.image}
        enlargedImageContainerStyle={{ background: "#fff", zIndex: 1000 }}
      />
      <div className={classes.nav}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={idx === index ? classes.active : ""}
            onClick={() => setIndex(idx)}
          >
            <img src={img} width={141} height={135} />
          </div>
        ))}
      </div>
    </div>
  );
}
