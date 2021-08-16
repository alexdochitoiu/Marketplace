import IProduct from "src/types/IProduct";
import { BiShoppingBag, BiHeart } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

interface IProps {
  product: IProduct;
}
export default function ({ product }: IProps) {
  const isPromo = !!product.promoPrice;
  const isOutOfStock = product.quantity <= 0;
  return (
    <div className={"product-card" + (isOutOfStock ? " product-outOfStock" : "")}>
      <div className="product-img">
        {isPromo && (
          <div className="product-isPromo">
            {isOutOfStock ? "STOC EPUIZAT!" : "REDUCERE"}
          </div>
        )}
        {product.images.length > 0 && (
          <img width={280} height={373} src={product.images[0]} />
        )}
        <div className="product-action">
          <div className="product-favorite">
            <BiHeart />
          </div>
          <div className="product-view">
            <AiOutlineEye />
          </div>
        </div>
      </div>
      <div className="product-content">
        <div className="product-title-price">
          <h4 className="product-title">{product.title}</h4>
          <div className="flex-row product-price">
            <h4 className={isPromo ? "product-promo-price" : ""}>
              {product.price} RON
            </h4>
            {isPromo && (
              <h4 style={{ marginLeft: 8 }}>{product.promoPrice} RON</h4>
            )}
          </div>
        </div>
        <div className="product-cart-category">
          <div className="product-category">{product.category?.title}</div>
          <div className="product-cart">
            <BiShoppingBag /> ADAUGA IN COS
          </div>
        </div>
      </div>
    </div>
  );
}
