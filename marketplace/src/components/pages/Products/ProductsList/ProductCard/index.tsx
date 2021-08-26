import IProduct from "src/types/IProduct";
import { BiShoppingBag, BiHeart } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import history from "src/constants/history";
import imageNotAvailable from "src/assets/images/no-image-available.jpg";
import "./styles.css";
import { computePriceString, isPromo, isOutOfStock } from "src/utils";

interface IProps {
  product: IProduct;
}

export default function ({ product }: IProps) {
  const promoProduct = isPromo(product);
  const outOfStockProduct = isOutOfStock(product);
  return (
    <div className="product-card">
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
          <div className="product-favorite">
            <BiHeart />
          </div>
          <div
            className="product-view"
            onClick={() => history.push(`/produs/${product._id}`)}
          >
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
          <div className="product-category">{product.category?.title || "Alte produse"}</div>
          <div className="product-cart">
            <BiShoppingBag /> ADAUGA IN COS
          </div>
        </div>
      </div>
    </div>
  );
}
