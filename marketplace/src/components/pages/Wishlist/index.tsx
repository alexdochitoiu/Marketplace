import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct from "src/types/IProduct";
import ProductsList from "../Products/ProductsList";
import * as productService from "src/services/product";
import ViewModeButtons from "../Products/ProductsTopBar/ViewModeButtons";
import { makeStyles } from "@material-ui/core";
import Button from "src/components/generic/Button";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";

const useStyles = makeStyles({
  listGridBtns: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 20,
  },
});

export default function () {
  const classes = useStyles();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    productService.getByIds(wishlist).then(({ data }) => {
      setProducts(data);
    });
  }, [wishlist]);

  if (products.length === 0) {
    return (
      <div
        style={{
          height: "calc(100vh - 300px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -30,
          background: "#eee",
        }}
      >
        <h4 style={{ fontSize: 30, color: "#444", marginBottom: 15 }}>
          <FaHeart style={{ color: "var(--primary) " }} /> Favorite
        </h4>
        <p style={{ fontSize: 18 }}>
          Se pare ca nu ai niciun produs adaugat la lista de favorite
        </p>
        <Button
          href="/produse"
          text="Produse"
          animation="slide"
          style={{ border: "1px solid #ccc" }}
        />
      </div>
    );
  }

  return (
    <div>
      <TitleBanner title="Favorite" />
      <div className="container">
        <div className={classes.listGridBtns}>
          <ViewModeButtons />
        </div>
        <ProductsList products={products} />
      </div>
    </div>
  );
}
