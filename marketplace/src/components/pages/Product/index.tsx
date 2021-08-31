import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct, { ISize } from "src/types/IProduct";
import * as productService from "src/services/product";
import { useRouteMatch } from "react-router-dom";
import ProductImages from "./ProductImages";
import history from "src/constants/history";
import { makeStyles, Tooltip } from "@material-ui/core";
import Button from "src/components/generic/Button";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import SelectQuantity from "./SelectQuantity";
import "./styles.css";
import SelectSize from "./SelectSize";
import SizeGuide from "./SizeGuide";
import ProductColor from "./ProductColor";
import ProductPrice from "./ProductPrice";
import QuantityInfoText from "./QuantityInfoText";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import useAddOrRemoveFromWishlist from "src/utils/customHooks/useAddOrRemoveFromWishlist";
import SnackBar from "src/components/generic/SnackBar";
import FavoriteSnackContent from "../Products/ProductsList/FavoriteSnackContent";

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
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const addOrRemoveFromWishlist = useAddOrRemoveFromWishlist();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [pcProducts, setPCProducts] = React.useState<IProduct[]>([]);
  const [selectedQuantity, setSelectedQuantity] = React.useState("1");
  const [selectedSize, setSelectedSize] = React.useState<ISize | null>(null);
  const [snack, setSnack] = React.useState<React.ReactNode | null>(null);
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    const { productId } = router.params;
    if (productId) {
      productService.getById(productId).then(({ data }) => {
        setProduct(data);
        productService
          .getByProductCode(data.productCode)
          .then(({ data: pcData }) => setPCProducts(pcData));
      });
    }
  }, []);

  if (!product) {
    return (
      <div>
        <TitleBanner title="Articol inexistent" />
      </div>
    );
  }

  const handleHeartClick = () => {
    const operation = addOrRemoveFromWishlist(product._id);
    setSnack(<FavoriteSnackContent operation={operation} />);
  };

  const isWishlist = wishlist.indexOf(product._id) !== -1;

  return (
    <div>
      <SnackBar
        message={snack}
        open={Boolean(snack)}
        onClose={() => setSnack(null)}
      />
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
            <ProductPrice product={product} selectedSize={selectedSize} />
            <p
              className="product-listItem-description"
              style={{ maxHeight: "initial" }}
            >
              {product.description}
            </p>
            <div>
              <h3 style={{ marginTop: 20, marginBottom: 10, color: "#444" }}>
                Selectează mărimea produsului:
              </h3>
              <SelectSize
                defaultSize={selectedSize}
                sizes={product.sizes}
                onChange={(size) => setSelectedSize(size)}
              />
              <SizeGuide />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10, color: "#444" }}>
                Alege culoarea:
              </h3>
              <div style={{ display: "flex" }}>
                {pcProducts.map(
                  (pcp) =>
                    pcp.color && (
                      <a
                        key={pcp._id}
                        href={
                          product._id !== pcp._id
                            ? `/produs/${pcp._id}`
                            : undefined
                        }
                      >
                        <ProductColor
                          product={pcp}
                          selected={product._id === pcp._id}
                        />
                      </a>
                    )
                )}
              </div>
            </div>
            <QuantityInfoText selectedSize={selectedSize} />
            <div
              className="product-listItem-actions"
              style={{ justifyContent: "space-between", marginTop: 20 }}
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
              <Tooltip
                title={
                  isWishlist
                    ? "Sterge din lista de favorite"
                    : "Adauga la lista de favorite"
                }
              >
                <div>
                  <Button
                    animation="slide"
                    style={{
                      marginLeft: 30,
                      padding: 11,
                      border: "1px solid #ddd",
                    }}
                    onClick={handleHeartClick}
                  >
                    {isWishlist ? (
                      <FaHeart style={{ width: 25, height: 25 }} />
                    ) : (
                      <BiHeart style={{ width: 25, height: 25 }} />
                    )}
                  </Button>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
