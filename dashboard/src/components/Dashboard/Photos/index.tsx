import React from "react";
import { Dialog, Fab, Grid, makeStyles, Theme } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { logout } from "src/services/auth";
import { useHistory } from "react-router-dom";
import Image from "./Image";
import * as imageService from "src/services/photo";
import { IImage } from "src/types/IImage";
import * as routes from "src/constants/routes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  grid: {
    padding: 15,
    height: "calc(100vh - 80px)",
    width: "100%",
    overflowY: "auto",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function () {
  const classes = useStyles();
  const history = useHistory();
  const uploadImages = React.useRef<HTMLInputElement | null>(null);
  const [images, setImages] = React.useState<IImage[]>([]);
  const [openedImage, setOpenedImage] = React.useState<IImage | null>(null);

  React.useEffect(() => {
    imageService.getAll().then(({ data }) => {
      setImages(data.images);
    });
  }, []);

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    if (files) {
      const formData = new FormData();
      [...files].forEach((f: any) => {
        formData.append("images", f);
      });
      imageService
        .upload(formData)
        .then(({ data }) => {
          setImages([...images, ...data.images]);
        })
        .catch((error) => {
          if (error.response) {
            logout();
            history.push(routes.LOGIN);
          }
        });
    }
  };

  return (
    <div className={classes.root}>
      <Dialog open={Boolean(openedImage)} onClose={() => setOpenedImage(null)}>
        {openedImage && <Image variant="fullscreen" image={openedImage} />}
      </Dialog>
      <Grid className={classes.grid}>
        {images.map((image) => (
          <Image
            key={image.name}
            variant="thumbnail"
            image={image}
            onClick={() => setOpenedImage(image)}
          />
        ))}
      </Grid>
      <input
        accept="image/*"
        style={{ display: "none" }}
        name="images"
        multiple={true}
        type="file"
        ref={uploadImages}
        onChange={handleImageChange}
      />
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => {
          uploadImages?.current?.click();
        }}
      >
        <PhotoCameraIcon />
      </Fab>
    </div>
  );
}
