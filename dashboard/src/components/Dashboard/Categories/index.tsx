import { Fab, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ICategory from "src/types/ICategory";
import CategoryCard from "./CategoryCard";
import * as categoryService from "src/services/category";
import AddIcon from "@material-ui/icons/Add";
import CategoryDialog from "./CategoryDialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [dialog, setDialog] = useState<"create" | "update" | null>(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState<
    ICategory | undefined
  >(undefined);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleDone = ({ title, description, image, section, active }: any) => {
    const data = new FormData();
    data.append("title", title);
    data.append("section", section);
    data.append("description", description);
    data.append("active", active);
    if (image) {
      data.append("image", image);
    }
    if (dialog === "create") {
      categoryService
        .create(data)
        .then(({ data }) => setCategories([...categories, data]))
        .catch(({ response: { data } }) => console.log(data.error));
    } else if (dialog === "update" && categoryToUpdate) {
      categoryService
        .update(categoryToUpdate._id, data)
        .then(({ data }) => {
          console.log(data);
          setCategories(categories.map((c) => (c._id === data._id ? data : c)));
        })
        .catch(({ response: { data } }) => console.log(data.error));
    }

    handleDialogClose();
  };

  const handleDelete = (id: string) => {
    categoryService.remove(id).then(({ data }) => {
      setCategories(categories.filter((c) => c._id !== data._id));
    });
  };

  const handleEdit = (category: ICategory) => {
    setDialog("update");
    setCategoryToUpdate(category);
  };

  const handleDialogClose = () => {
    setDialog(null);
    setCategoryToUpdate(undefined);
  };

  return (
    <div className={classes.root}>
      {categories.length === 0 && (
        <NoItems
          primaryText="Nu exista categorii"
          secondaryText={
            <>
              Apasa
              <AddCircleIcon
                fontSize="small"
                color="primary"
                style={{ margin: "0 3px " }}
              />
              pentru a crea
            </>
          }
        />
      )}
      {categories.map((c) => (
        <CategoryCard
          key={c._id}
          category={c}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      {dialog && (
        <CategoryDialog
          mode={dialog}
          onClose={handleDialogClose}
          onDone={handleDone}
          category={categoryToUpdate}
        />
      )}
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
