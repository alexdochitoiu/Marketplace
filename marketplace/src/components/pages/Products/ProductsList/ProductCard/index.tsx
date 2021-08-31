import IProduct from "src/types/IProduct";
import { BiShoppingBag, BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import history from "src/constants/history";
import imageNotAvailable from "src/assets/images/no-image-available.jpg";
import "./styles.css";
import { computePriceString, isPromo, isOutOfStock } from "src/utils";
import React from "react";
import SnackBar from "src/components/generic/SnackBar";
import FavoriteSnackContent from "../FavoriteSnackContent";
import { Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import useAddOrRemoveFromWishlist from "src/utils/customHooks/useAddOrRemoveFromWishlist";

interface IProps {
  product: IProduct;
}

export default function ({ product }: IProps) {
  const [snack, setSnack] = React.useState<React.ReactNode | null>(null);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const addOrRemoveFromWishlist = useAddOrRemoveFromWishlist();
  const promoProduct = isPromo(product);
  const outOfStockProduct = isOutOfStock(product);

  const handleHeartClick = () => {
    const operation = addOrRemoveFromWishlist(product._id);
    setSnack(<FavoriteSnackContent operation={operation} />);
  };

  const isWishlist = wishlist.indexOf(product._id) !== -1;

  return (
    <div className="product-card">
      <SnackBar
        message={snack}
        open={Boolean(snack)}
        onClose={() => setSnack(null)}
      />
      <div className="product-img">
        {(promoProduct || outOfStockProduct) && (
          <div className="product-isPromo">
            {outOfStockProduct ? "STOC EPUIZAT" : "REDUCERE"}
          </div>
        )}
        {isWishlist && (
          <Tooltip title="Sterge din lista de favorite">
            <div
              className="product-isPromo"
              style={{ left: "initial", right: 1, cursor: "pointer" }}
              onClick={handleHeartClick}
            >
              <FaHeart style={{ width: 18, height: 18, fill: "red" }} />
            </div>
          </Tooltip>
        )}
        <img
          width={280}
          height={373}
          src={
            product.images.length > 0 ? product.images[0] : imageNotAvailable
          }
        />
        <div className="product-action">
          <Tooltip
            title={
              isWishlist
                ? "Sterge din lista de favorite"
                : "Adauga la lista de favorite"
            }
          >
            <div onClick={handleHeartClick}>
              {isWishlist ? <FaHeart /> : <BiHeart />}
            </div>
          </Tooltip>
          <div onClick={() => history.push(`/produs/${product._id}`)}>
            <AiOutlineEye />
          </div>
        </div>
      </div>
      <div className="product-content">
        <div className="product-title-price">
          <div className="flex-row product-price">
            <h4
              style={{ whiteSpace: "nowrap" }}
              className={promoProduct ? "product-promo-price" : ""}
            >
              {computePriceString(product.sizes, "price")} RON
            </h4>
            {promoProduct && (
              <h4 style={{ marginLeft: 8, whiteSpace: "nowrap" }}>
                {computePriceString(product.sizes, "promoPrice")} RON
              </h4>
            )}
          </div>
          <h4 className="product-title">{product.title}</h4>
        </div>
        <div className="product-cart-category">
          <div className="product-category">
            {product.category?.title || "Alte produse"}
          </div>
          <div className="product-cart">
            <BiShoppingBag /> ADAUGA IN COS
          </div>
        </div>
      </div>
    </div>
  );
}
