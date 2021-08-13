import React from "react";
import { Dialog, Fab, Grid, makeStyles, Theme } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { logout } from "src/services/auth";
import { useHistory } from "react-router-dom";
import Image from "./Image";
import * as imageService from "src/services/photo";
import { IImage } from "src/types/IImage";
import * as routes from "src/constants/routes";
import NoItems from "src/components/shared/NoItems";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 15,
    height: "calc(100vh - 80px)",
    overflowY: "auto",
    alignItems: "flex-start",
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

  const handleDelete = (name: string) => {
    imageService
      .remove(name)
      .then(() => {
        setImages(images.filter((i) => i.name !== name));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      {images.length === 0 && (
        <NoItems
          primaryText="Nu exista imagini"
          secondaryText={
            <>
              Apasa
              <PhotoCameraIcon
                fontSize="small"
                color="primary"
                style={{ margin: "0 3px " }}
              />
              pentru a adauga
            </>
          }
        />
      )}
      <Dialog open={Boolean(openedImage)} onClose={() => setOpenedImage(null)}>
        {openedImage && (
          <img
            src={openedImage.src}
            alt={openedImage.name}
            style={{
              background: "#222",
              objectFit: "contain",
              overflow: "hidden",
            }}
          />
        )}
      </Dialog>
      {images.map((image) => (
        <Image
          key={image.name}
          image={image}
          onClick={() => setOpenedImage(image)}
          onDelete={handleDelete}
        />
      ))}
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
