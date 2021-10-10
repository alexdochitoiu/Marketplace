import IOrder from "src/types/IOrder";

interface IProps {
  cartItem: IOrder["cart"][number];
}

export default function ({ cartItem }: IProps) {
  const selectedSize = cartItem.product
    ? cartItem.product.sizes.find((s) => s.size === cartItem.selectedSize)
    : null;

  if (!selectedSize) {
    return null;
  }

  const selectedQuantity = parseInt(cartItem.selectedQuantity, 10);
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
