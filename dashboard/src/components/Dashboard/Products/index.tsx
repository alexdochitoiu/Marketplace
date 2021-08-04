import { Fab, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import IProduct from "src/types/IProduct";
import ProductDialog from "./ProductDialog";

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

export default function Products() {
  const classes = useStyles();
  const [dialog, setDialog] = useState<"create" | "update" | null>(null);

  const handleDone = (product: Omit<IProduct, "_id">) => {
    console.log(product);
  };

  const handleDialogClose = () => {
    setDialog(null);
  };

  return (
    <div className={classes.root}>
      {dialog && (
        <ProductDialog
          mode={dialog}
          onClose={handleDialogClose}
          onDone={handleDone}
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
