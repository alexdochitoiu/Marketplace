import { Fab, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import ICategory from "src/types/ICategory";
import Category from "./Category";
import * as categoryService from "src/services/category";
import AddIcon from "@material-ui/icons/Add";
import CategoryDialog from "./CategoryDialog";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 15,
    height: "calc(100vh - 80px)",
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
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [dialog, setDialog] = React.useState<"create" | "update" | null>(null);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleDone = ({ title, description, image }: any) => {
    if (dialog === "create") {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      if (image) {
        data.append("image", image);
      }
      categoryService
        .create(data)
        .then(({ data }) => setCategories([...categories, data]))
        .catch(({ response: { data } }) => console.log(data.error));
    }

    setDialog(null);
  };

  const handleDelete = (id: string) => {
    categoryService.remove(id).then(({ data }) => {
      setCategories(categories.filter((c) => c._id !== data._id));
    });
  };

  return (
    <div className={classes.root}>
      {categories.map((c) => (
        <Category
          key={c._id}
          category={c}
          onDelete={handleDelete}
          onEdit={() => setDialog("update")}
        />
      ))}
      <CategoryDialog
        mode={dialog}
        onClose={() => setDialog(null)}
        onDone={handleDone}
      />
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => setDialog("create")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
