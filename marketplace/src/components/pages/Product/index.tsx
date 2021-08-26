import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import { useRouteMatch } from "react-router-dom";
import ProductImages from "./ProductImages";
import history from "src/constants/history";
import { makeStyles } from "@material-ui/core";
import Button from "src/components/generic/Button";
import { BiHeart } from "react-icons/bi";
import SelectQuantity from "./SelectQuantity";
import "./styles.css";
import SelectSize from "./SelectSize";
import SizeGuide from "./SizeGuide";
import ColorCard from "./ProductColor";
import { computePriceString, isPromo } from "src/utils";

const useStyles = makeStyles({
  root: {
    margin: "80px 0",
    display: "flex",
  },
  title: {
    color: "#3e3e3e",
    fontSize: 28,
    fontWeight: 600,
  },
  category: {
    fontSize: 15,
    color: "#666",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "var(--primary)",
    },
  },
});

export default function () {
  const classes = useStyles();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [selectedQuantity, setSelectedQuantity] = React.useState("1");
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    const { productId } = router.params;
    if (productId) {
      productService.getById(productId).then(({ data }) => setProduct(data));
    }
  }, []);

  if (!product) {
    return (
      <div>
        <TitleBanner title="Articol inexistent" />
      </div>
    );
  }

  return (
    <div>
      <TitleBanner title={product.title} />
      <div className="container">
        <div className={classes.root}>
          <ProductImages images={product.images} />
          <div>
            <h3
              className={classes.title}
              onClick={() => history.push(`/produs/${product._id}`)}
            >
              {product.title}
            </h3>
            {product.category && (
              <a
                className={classes.category}
                href={`/produse/${product.category._id}`}
              >
                {product.category.title.toUpperCase()}
              </a>
            )}
            <div
              className="product-listItem-price"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h4
                style={
                  isPromo(product)
                    ? {
                        color: "#888",
                        textDecoration: "line-through",
                        fontSize: 24,
                        marginRight: 16,
                      }
                    : { color: "var(--primary)", fontSize: 28 }
                }
              >
                {computePriceString(product.sizes, "price")} RON
              </h4>
              {isPromo(product) && (
                <h4
                  style={{
                    color: "var(--primary)",
                    fontSize: 28,
                  }}
                >
                  {computePriceString(product.sizes, "promoPrice")} RON
                </h4>
              )}
            </div>
            <p className="product-listItem-description">
              {product.description}
            </p>
            <div>
              <h3 style={{ marginTop: 20, marginBottom: 10, color: "#444" }}>
                Selectează mărimea produsului:
              </h3>
              <SelectSize sizes={product.sizes} />
              <SizeGuide />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10, color: "#444" }}>
                Alege culoarea:
              </h3>
              <div style={{ display: "flex" }}>
                <ColorCard color="#444" selected={true} />
                <ColorCard color="crimson" />
                <ColorCard color="steelblue" />
              </div>
            </div>
            <div
              className="product-listItem-actions"
              style={{ justifyContent: "space-between", marginTop: 50 }}
            >
              <SelectQuantity
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
              />
              <Button
                animation="slide"
                text="Adauga in cos"
                style={{
                  flexGrow: 1,
                  border: "1px solid #ddd",
                  color: "#fff",
                  background: "#444",
                  textAlign: "center",
                }}
              />
              <Button
                animation="slide"
                style={{
                  marginLeft: 30,
                  padding: 11,
                  border: "1px solid #ddd",
                }}
              >
                <BiHeart style={{ width: 25, height: 25 }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
