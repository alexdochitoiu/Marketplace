import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import ICategory from "src/types/ICategory";
import PanoramaIcon from "@material-ui/icons/Panorama";
import CancelIcon from "@material-ui/icons/Cancel";
import ImagePicker from "../../../shared/ImagePicker";
import { IImage } from "src/types/IImage";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  removeImageButton: {
    cursor: "pointer",
    width: 15,
    height: 15,
    color: "red",
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#fff",
    borderRadius: "50%",
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
}));

interface IProps {
  mode: "create" | "update" | null;
  onClose: () => void;
  onDone: (category: Partial<ICategory>) => void;
  category?: ICategory;
}

export default function ({ mode, onClose, onDone, category }: IProps) {
  const classes = useStyles();
  const uploadImage = React.useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = React.useState(category ? category.title : "");
  const [description, setDescription] = React.useState(
    category ? category.description : ""
  );
  const [image, setImage] = React.useState<any>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any>(
    category ? category.image : null
  );
  const [selectImage, setSelectImage] = React.useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onDone({ title, description, image });
  };

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreviewUrl(e.target?.result);
      };
      reader.readAsDataURL(files[0]);
      setImage(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreviewUrl(null);
  };

  const handleSelectImage = (img: IImage) => {
    setImage(img.src);
    setImagePreviewUrl(img.src);
    setSelectImage(false);
  };

  return (
    <Dialog open={Boolean(mode)} onClose={onClose} fullWidth={true}>
      <DialogTitle className={classes.title}>
        {mode === "create" ? "Creeaza categorie" : "Modifica categorie"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            variant="outlined"
            required={true}
            label="Titlu"
          />
          <TextField
            margin="normal"
            fullWidth={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            variant="outlined"
            label="Descriere"
            required={true}
            multiline={true}
            minRows={2}
            maxRows={4}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                className={classes.avatar}
                src={imagePreviewUrl}
                children={<PanoramaIcon />}
              />
              {imagePreviewUrl && (
                <CancelIcon
                  className={classes.removeImageButton}
                  onClick={handleRemoveImage}
                />
              )}
            </div>
            <div
              style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                name="image"
                type="file"
                ref={uploadImage}
                onChange={handleImageChange}
              />
              <Button
                onClick={() => {
                  uploadImage?.current?.click();
                }}
              >
                Incarca
              </Button>
              <Button onClick={() => setSelectImage(true)}>Selecteaza</Button>
              <ImagePicker
                open={selectImage}
                onClose={() => setSelectImage(false)}
                onSelect={handleSelectImage}
              />
            </div>
          </div>
          <Button
            fullWidth={true}
            variant="contained"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            {mode === "create" ? "Creeaza" : "Modifica"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
