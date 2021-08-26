import IProduct from "src/types/IProduct";
import { AiOutlineEye } from "react-icons/ai";
import history from "src/constants/history";
import imageNotAvailable from "src/assets/images/no-image-available.jpg";
import "./styles.css";
import Button from "src/components/generic/Button";
import { BiHeart } from "react-icons/bi";
import { isPromo, isOutOfStock, computePriceString } from "src/utils";

interface IProps {
  product: IProduct;
}

export default function ({ product }: IProps) {
  const promoProduct = isPromo(product);
  const outOfStockProduct = isOutOfStock(product);
  return (
    <div className="product-listItem">
      <div className="product-img">
        {(promoProduct || outOfStockProduct) && (
          <div className="product-isPromo">
            {outOfStockProduct ? "STOC EPUIZAT" : "REDUCERE"}
          </div>
        )}
        <img
          width={280}
          height={373}
          src={
            product.images.length > 0 ? product.images[0] : imageNotAvailable
          }
        />
        <div className="product-action">
          <div
            className="product-view"
            onClick={() => history.push(`/produs/${product._id}`)}
          >
            <AiOutlineEye />
          </div>
        </div>
      </div>
      <div className="product-listItem-content">
        <h4
          className="product-listItem-title"
          onClick={() => history.push(`/produs/${product._id}`)}
        >
          {product.title}
        </h4>
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
          />
          <Button
            animation="slide"
            style={{ marginLeft: 10, padding: 11, border: "1px solid #ddd" }}
          >
            <BiHeart style={{ width: 25, height: 25 }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
