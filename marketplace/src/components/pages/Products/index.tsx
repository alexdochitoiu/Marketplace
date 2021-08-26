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
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import { sortProducts } from "src/utils";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "0 auto",
    marginTop: 25,
    maxWidth: 1540,
  },
  productsWrapper: {
    margin: "0 10px",
    width: "100%",
  },
});

export default function () {
  const classes = useStyles();
  const router = useRouteMatch<any>();
  const { categoryId } = router.params;
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const sortBy = useSelector((state: RootState) => state.productsSortBy);

  React.useEffect(() => {
    if (categoryId) {
      productService.getByCategory(categoryId).then(({ data }) => {
        setProducts(data);
      });
      categoryService.getById(categoryId).then(({ data }) => {
        setCategory(data);
      });
    } else {
      productService.getAll().then(({ data }) => {
        setProducts(data);
      });
    }
  }, []);

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div>
      <TitleBanner
        title={
          category?.title ||
          (categoryId === "alte-produse" ? "Alte produse" : "Articole")
        }
      />
      <div className={classes.root}>
        <ProductsSideBar />
        <div className={classes.productsWrapper}>
          <ProductsTopBar />
          <ProductsList products={sortedProducts} />
        </div>
      </div>
    </div>
  );
}
