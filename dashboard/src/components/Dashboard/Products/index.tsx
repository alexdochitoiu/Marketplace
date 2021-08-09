import { Fab, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import IProduct, { IProductModel } from "src/types/IProduct";
import ProductDialog from "./ProductDialog";
import * as productService from "src/services/product";
import React from "react";
import ProductCard from "./ProductCard";

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

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [dialog, setDialog] = useState<"create" | "update" | null>(null);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | undefined>(
    undefined
  );

  React.useEffect(() => {
    productService.getAll().then(({ data }) => {
      console.log(data);
      setProducts(data);
    });
  }, []);

  const handleDone = (product: IProductModel) => {
    const data = new FormData();
    data.append("title", product.title);
    data.append("description", product.description);
    if (product.category) {
      data.append("category", product.category);
    }
    data.append("quantity", `${product.quantity}`);
    data.append("price", `${product.price}`);
    if (product.promoPrice) {
      data.append("promoPrice", `${product.promoPrice}`);
    }
    if (product.images.length > 0) {
      [...product.images].map((img) => data.append("images", img));
    }
    data.append("sizes", JSON.stringify(product.sizes));

    if (dialog === "create") {
      productService
        .create(data)
        .then(({ data }) => setProducts([...products, data]));
    } else if (dialog === "update" && productToUpdate) {
      productService
        .update(productToUpdate._id, data)
        .then(({ data }) => {
          setProducts(products.map((p) => (p._id === data._id ? data : p)));
        })
        .catch(({ response: { data } }) => console.log(data.error));
    }

    handleDialogClose();
  };

  const handleDelete = (id: string) => {
    productService.remove(id).then(({ data }) => {
      setProducts(products.filter((p) => p._id !== data._id));
    });
  };

  const handleEdit = (product: IProduct) => {
    setDialog("update");
    setProductToUpdate(product);
  };

  const handleDialogClose = () => {
    setDialog(null);
    setProductToUpdate(undefined);
  };

  return (
    <div className={classes.root}>
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      {dialog && (
        <ProductDialog
          mode={dialog}
          onClose={handleDialogClose}
          onDone={handleDone}
          product={productToUpdate}
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
