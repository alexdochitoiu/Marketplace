import IProduct from "src/types/IProduct";
import { AiOutlineEye } from "react-icons/ai";
import history from "src/constants/history";
import imageNotAvailable from "src/assets/images/no-image-available.jpg";
import "./styles.css";
import Button from "src/components/generic/Button";
import { BiHeart } from "react-icons/bi";
import { isPromo, isOutOfStock, computePriceString } from "src/utils";
import React from "react";
import { FaHeart } from "react-icons/fa";
import FavoriteSnackContent from "../../../../generic/SnackContent/FavoriteSnackContent";
import SnackBar from "src/components/generic/SnackBar";
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
    <div className="product-listItem">
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
        <a href={`/produs/${product._id}`}>
          <img
            width={280}
            height={373}
            src={
              product.images.length > 0 ? product.images[0] : imageNotAvailable
            }
            alt={product.title}
          />
          {/* <div className="product-action">
          <div
            className="product-view"
            onClick={() => history.push(`/produs/${product._id}`)}
          >
            <AiOutlineEye />
          </div>
        </div> */}
        </a>
      </div>
      <div className="product-listItem-content">
        <a href={`/produs/${product._id}`}>
          <h4 className="product-listItem-title">{product.title}</h4>
        </a>
        <div className="product-listItem-price">
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
        <p className="product-listItem-description">{product.description}</p>
        <div className="product-listItem-actions">
          <Button
            animation="slide"
            text="Adauga in cos"
            style={{ border: "1px solid #ddd" }}
            href={`/produs/${product._id}`}
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
                onClick={handleHeartClick}
                animation="slide"
                style={{
                  marginLeft: 10,
                  padding: 11,
                  border: "1px solid #ddd",
                }}
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
  );
}
