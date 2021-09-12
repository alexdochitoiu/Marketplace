import { ICartItem } from "src/redux/types";
import "./styles.css";
import useTotalCartPrice from "src/utils/customHooks/useTotalCartPrice";

interface IProps {
  cart: ICartItem[];
}
export default function ({ cart }: IProps) {
  const cartPrice = useTotalCartPrice();
  const { totalPrice, totalDiscount, shippingFee } = cartPrice;
  return (
    <div className="total-price-root">
      <div className="flex-row">
        <h4>Cost produse</h4>
        <h4>{totalPrice} RON</h4>
      </div>
      <div className="flex-row">
        <h4>Cost livrare</h4>
        <h4>{shippingFee} RON</h4>
      </div>
      <div className="flex-row" style={{ background: "#eee" }}>
        <h4 style={{ fontWeight: 600 }}>Total</h4>
        <h4 style={{ color: "var(--primary)", fontSize: 19 }}>
          {totalPrice + shippingFee} RON
        </h4>
      </div>
      <div className="flex-row" style={{ marginTop: 10 }}>
        <h4 style={{ fontSize: 14 }}>Economisești</h4>
        <h4
          style={{
            fontSize: 15,
            color: "#e40606",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {totalDiscount} RON
        </h4>
      </div>
    </div>
  );
}
