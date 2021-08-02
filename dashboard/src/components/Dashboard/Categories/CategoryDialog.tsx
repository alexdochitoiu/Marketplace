import {
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

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface IProps {
  mode: "create" | "update" | null;
  onClose: () => void;
  onDone: (category: Partial<ICategory>) => void;
}

export default function ({ mode, onClose, onDone }: IProps) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onDone({ title, description, image });
  };

  return (
    <Dialog open={Boolean(mode)} onClose={onClose} fullWidth={true}>
      <DialogTitle className={classes.title}>
        {mode?.toUpperCase()} CATEGORY
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
            label="Title"
          />
          <TextField
            margin="normal"
            fullWidth={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            variant="outlined"
            label="Description"
            required={true}
            multiline={true}
            minRows={2}
            maxRows={4}
          />
          <Button
            fullWidth={true}
            variant="contained"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
