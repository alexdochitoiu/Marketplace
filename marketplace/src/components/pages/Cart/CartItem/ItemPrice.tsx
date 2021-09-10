import { ISize } from "src/types/IProduct";

interface IProps {
  selectedSize: ISize;
  selectedQuantity: number;
}

export default function ({ selectedSize, selectedQuantity }: IProps) {
  const totalPrice = selectedSize.price * selectedQuantity;
  const totalPromoPrice = (selectedSize.promoPrice || 0) * selectedQuantity;
  return (
    <div
      style={{
        alignSelf: "center",
        marginRight: 20,
      }}
    >
      <h4
        style={
          !!totalPromoPrice
            ? {
                color: "#888",
                textDecoration: "line-through",
                fontSize: 16,
                marginRight: 16,
              }
            : { color: "var(--primary)", fontSize: 18 }
        }
      >
        {totalPrice} RON
      </h4>
      {!!totalPromoPrice && (
        <h4 style={{ color: "var(--primary)", fontSize: 18 }}>
          {totalPromoPrice} RON
        </h4>
      )}
    </div>
  );
}
