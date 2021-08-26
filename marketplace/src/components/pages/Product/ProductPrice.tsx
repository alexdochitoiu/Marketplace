import IProduct, { ISize } from "src/types/IProduct";
import { isPromo, computePriceString } from "src/utils";

interface ITextProps {
  oldPrice?: boolean;
  children: any;
}

const Text = ({ oldPrice, children }: ITextProps) => (
  <h4
    style={
      oldPrice
        ? {
            color: "#888",
            textDecoration: "line-through",
            fontSize: 24,
            marginRight: 16,
          }
        : { color: "var(--primary)", fontSize: 28 }
    }
  >
    {children}
  </h4>
);

interface IProps {
  product: IProduct;
  selectedSize: ISize | null;
}

export default function ({ product, selectedSize }: IProps) {
  return (
    <div
      className="product-listItem-price"
      style={{ display: "flex", alignItems: "center" }}
    >
      {selectedSize ? (
        <>
          <Text oldPrice={!!selectedSize.promoPrice}>
            {selectedSize.price} RON
          </Text>
          {!!selectedSize.promoPrice && (
            <Text>{selectedSize.promoPrice} RON</Text>
          )}
        </>
      ) : (
        <>
          <Text oldPrice={isPromo(product)}>
            {computePriceString(product.sizes, "price")} RON
          </Text>
          {isPromo(product) && (
            <Text>{computePriceString(product.sizes, "promoPrice")} RON</Text>
          )}
        </>
      )}
    </div>
  );
}
