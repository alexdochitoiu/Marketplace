import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ICategory from "src/types/ICategory";
import PanoramaIcon from "@material-ui/icons/Panorama";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import React from "react";

const useStyles = makeStyles({
  root: {
    margin: 5,
    width: 220,
    minHeight: 240,
  },
  title: {
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    justifyContent: "space-between",
    borderTop: "1px solid #ccc",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
});

interface IProps {
  category: ICategory;
  onDelete: (id: string) => void;
  onEdit: (category: ICategory) => void;
}

export default function ({ category, onDelete, onEdit }: IProps) {
  const classes = useStyles();
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  return (
    <Card variant="outlined" className={classes.root}>
      <ConfirmationDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        title="Sterge categorie"
        contentText={
          "Esti sigur ca vrei sa stergi categoria '" + category.title + "'?"
        }
        confirmButtonText="Sterge"
        onConfirm={() => {
          setDeleteConfirmation(false);
          onDelete(category._id);
        }}
      />
      <CardHeader
        title={category.title}
        className={classes.title}
        titleTypographyProps={{ style: { fontSize: 20 } }}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="pre"
          style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}
        >
          {category.description.length > 100
            ? `${category.description.slice(0, 100)}...`
            : category.description}
        </Typography>
        <Avatar
          className={classes.avatar}
          src={category.image}
          children={<PanoramaIcon />}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton size="small" onClick={() => onEdit(category)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => setDeleteConfirmation(true)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
