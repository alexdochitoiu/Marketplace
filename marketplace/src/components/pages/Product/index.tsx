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
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, RootState } from "src/redux/types";
import useAddOrRemoveFromWishlist from "src/utils/customHooks/useAddOrRemoveFromWishlist";
import SnackBar from "src/components/generic/SnackBar";
import FavoriteSnackContent from "../../generic/SnackContent/FavoriteSnackContent";
import CartSnackContent from "src/components/generic/SnackContent/CartSnackContent";
import { doChangeCart } from "src/redux/actions";
import { uuid } from "uuidv4";
import { getSectionLabel } from "src/utils";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";
import Head from "src/components/generic/Head";
import { GrNotes } from "react-icons/gr";

const useStyles = makeStyles({
  root: {
    margin: "80px 0",
    display: "flex",
    justifyContent: "space-around",
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
  const windowSize = useWindowDimensions();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const addOrRemoveFromWishlist = useAddOrRemoveFromWishlist();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [pcProducts, setPCProducts] = React.useState<IProduct[]>([]);
  const [selectedQuantity, setSelectedQuantity] = React.useState("1");
  const [selectedSize, setSelectedSize] = React.useState<ISize | null>(null);
  const [error, setError] = React.useState("");
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

  if (!product.active) {
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
        <h4
          style={{
            fontSize: 30,
            color: "#444",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          <GrNotes style={{ fontSize: 50, marginRight: 10 }} />
        </h4>
        <p style={{ fontSize: 20 }}>Acest articol este momentan inactiv.</p>
        <Button
          onClick={() => history.goBack()}
          text="Inapoi"
          animation="slide"
          style={{ border: "1px solid #ccc", marginTop: 25 }}
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(
        "Trebuie să selectezi o mărime pentru a putea adăuga produsul în coș!"
      );
      return;
    }

    const item: ICartItem = {
      id: uuid(),
      productId: product._id,
      selectedQuantity: selectedQuantity,
      selectedSize: selectedSize.size,
      orderType: selectedSize.quantity === 0 ? "precomanda" : "comanda",
    };

    dispatch(doChangeCart([...cart, item]));
    setSnack(<CartSnackContent />);
  };

  const handleSelectSize = (size: ISize | null) => {
    setSelectedSize(size);
    setError("");
  };

  const handleHeartClick = () => {
    const operation = addOrRemoveFromWishlist(product._id);
    setSnack(<FavoriteSnackContent operation={operation} />);
  };

  const isWishlist = wishlist.indexOf(product._id) !== -1;

  return (
    <div>
      <Head
        title={product.title}
        description={product.description}
        image={
          product.images.length > 0
            ? product.images[0]
            : "https://miral-fashion.ro:4000/public/images/1636700451137miral-fashion-esarfa-din-blana-naturala-de-vizon-nurca-neagra.jpg"
        }
        url={window.location.href}
      />
      <SnackBar
        message={snack}
        open={Boolean(snack)}
        onClose={() => setSnack(null)}
      />
      <TitleBanner title={product.title} />
      <div className="container product-details">
        <div
          className={classes.root}
          style={
            windowSize.width < 1000
              ? {
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: windowSize.width < 350 ? -4 : 0,
                }
              : {}
          }
        >
          <ProductImages images={product.images} title={product.title} />
          <div
            className="product-content"
            style={
              windowSize.width < 1000 ? { marginTop: 50, width: "100%" } : {}
            }
          >
            <h3
              className={classes.title}
              onClick={() => history.push(`/produs/${product._id}`)}
            >
              {product.title}
            </h3>
            {product.category && (
              <div className="flex-row">
                <a
                  className={classes.category}
                  href={`/produse/section/${product.category.section}`}
                >
                  {getSectionLabel(product.category.section).toUpperCase()}
                </a>
                <span style={{ margin: "0 8px", color: "#666" }}>/</span>
                <a
                  className={classes.category}
                  href={`/produse/${product.category._id}`}
                >
                  {product.category.title.toUpperCase()}
                </a>
              </div>
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
                onChange={handleSelectSize}
              />
              {error && <h3 style={{ color: "red" }}>{error}</h3>}
              <SizeGuide />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10, color: "#444" }}>
                Alege culoarea:
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent:
                    windowSize.width < 1000 ? "center" : "flex-start",
                }}
              >
                {pcProducts.map(
                  (pcp) =>
                    pcp.color && (
                      <a
                        key={pcp._id}
                        style={{ margin: "4px 0" }}
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
            <div className="product-listItem-actions" style={{ marginTop: 20 }}>
              {selectedSize && (
                <SelectQuantity
                  value={selectedQuantity}
                  max={selectedSize?.quantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                />
              )}
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
                onClick={handleAddToCart}
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
