import { Fab, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import IProduct, { IProductModel } from "src/types/IProduct";
import ProductDialog from "./ProductDialog";
import * as productService from "src/services/product";
import React from "react";
import ProductCard from "./ProductCard";
import NoItems from "src/components/shared/NoItems";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Loading from "src/components/shared/Loading";

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
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [dialog, setDialog] = useState<"create" | "update" | null>(null);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | undefined>(
    undefined
  );

  React.useEffect(() => {
    setLoading(true);
    productService.getAll().then(({ data }) => {
      console.log(data);
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleDone = (
    product: IProductModel,
    operation: "create" | "update"
  ) => {
    const data = new FormData();
    data.append("title", product.title);
    data.append("productCode", product.productCode);
    data.append("description", product.description);
    data.append("sizeType", product.sizeType);
    data.append("sizes", JSON.stringify(product.sizes));
    data.append("active", `${product.active}`);
    if (product.category) {
      data.append("category", product.category);
    }
    if (product.color) {
      data.append("color", product.color);
    }
    if (product.images.length > 0) {
      [...product.images].map((img) => data.append("images", img));
    }

    if (operation === "create") {
      productService
        .create(data)
        .then(({ data }) => setProducts([...products, data]));
    } else if (operation === "update" && productToUpdate) {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      {products.length === 0 && (
        <NoItems
          primaryText="Nu exista articole"
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
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onDuplicate={(p) =>
            handleDone(
              { ...p, title: `Copy - ${p.title}`, category: p.category?._id },
              "create"
            )
          }
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
