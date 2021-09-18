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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import { filterProducts, getSectionLabel, sortProducts } from "src/utils";
import { doChangeMaxPrice } from "src/redux/actions";

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
  const dispatch = useDispatch();
  const { categoryId, sectionType } = router.params;
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const sortBy = useSelector((state: RootState) => state.productsSortBy);
  const priceInterval = useSelector((state: RootState) => state.priceInterval);
  const productSearchValue = useSelector(
    (state: RootState) => state.productSearchValue
  );

  React.useEffect(() => {
    if (categoryId) {
      productService.getByCategory(categoryId).then(({ data }) => {
        setProducts(data);
      });
      categoryService.getById(categoryId).then(({ data }) => {
        setCategory(data);
      });
    } else if (sectionType) {
      if (sectionType === "all") {
        productService.getAll().then(({ data }) => {
          setProducts(data);
        });
      } else {
        productService.getBySection(sectionType).then(({ data }) => {
          setProducts(data);
        });
      }
    }
  }, []);

  const maxPrice = Math.max(
    ...products.map((p) => Math.max(...p.sizes.map((s) => s.price)))
  );

  React.useEffect(() => {
    if (maxPrice === -Infinity) {
      return;
    }
    dispatch(doChangeMaxPrice(maxPrice));
    console.log(maxPrice);
  }, [maxPrice]);

  let displayProducts = products;

  displayProducts = filterProducts(
    displayProducts,
    priceInterval,
    productSearchValue
  );

  displayProducts = sortProducts(displayProducts, sortBy);

  return (
    <div>
      <TitleBanner title={category?.title || getSectionLabel(sectionType)} />
      <div className={classes.root}>
        <ProductsSideBar />
        <div className={classes.productsWrapper}>
          <ProductsTopBar productsCount={displayProducts.length} />
          <ProductsList products={displayProducts} />
        </div>
      </div>
    </div>
  );
}
