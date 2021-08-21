import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import * as categoryService from "src/services/category";
import ProductsSideBar from "./ProductsSideBar";
import ProductsTopBar from "./ProductsTopBar";
import { useRouteMatch } from "react-router-dom";
import ICategory from "src/types/ICategory";
import ProductsList from "./ProductsList";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "0 auto",
    marginTop: 25,
    maxWidth: 1540,
  },
  productsWrapper: {
    margin: "0 10px", width: "100%"
  }
});

export default function () {
  const classes = useStyles();
  const router = useRouteMatch<any>();
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    productService.getAll().then(({ data }) => {
      setProducts(data);
    });
    const { categoryId } = router.params;
    if (categoryId) {
      categoryService.getById(categoryId).then(({ data }) => setCategory(data));
    }
  }, []);

  return (
    <div>
      <TitleBanner title={category?.title || "Articole"} />
      <div className={classes.root}>
        <ProductsSideBar />
        <div className={classes.productsWrapper}>
          <ProductsTopBar />
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}
