import { RootState } from "src/redux/types";
import IProduct from "src/types/IProduct";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import ProductListItem from "./ProductListItem";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  list: {
    flexDirection: "column",
  },
});

interface IProps {
  products: IProduct[];
}
export default function ({ products }: IProps) {
  const classes = useStyles();
  const viewMode = useSelector((state: RootState) => state.productsViewMode);
  const ProductItem = viewMode === "grid" ? ProductCard : ProductListItem;
  return (
    <div
      className={clsx(classes.root, { [classes.list]: viewMode === "list" })}
    >
      {products.map((p, idx) => (
        <ProductItem key={idx} product={p} />
      ))}
    </div>
  );
}
