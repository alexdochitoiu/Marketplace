import React from "react";
import { useSelector } from "react-redux";
import { ICartItem, RootState } from "src/redux/types";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import useTotalCartPrice from "src/utils/customHooks/useTotalCartPrice";

interface ICartItemProps {
  item: ICartItem;
}
const CartItem = ({ item }: ICartItemProps) => {
  const [product, setProduct] = React.useState<IProduct | null>(null);

  React.useEffect(() => {
    productService.getById(item.productId).then(({ data }) => {
      setProduct(data);
    });
  }, []);

  if (!product) {
    return null;
  }

  const selectedSize = product.sizes.find((s) => s.size === item.selectedSize);

  return (
    <div
      className="flex-row"
      style={{
        justifyContent: "space-between",
        padding: "0 6px",
        border: "1px solid #eee",
        margin: "5px 0",
      }}
    >
      <div style={{ flex: "75%" }}>
        <p
          style={{
            fontSize: 14,
            color: "#444",
            marginBottom: 0,
            wordBreak: "break-word",
          }}
        >
          {item.selectedQuantity} x {product.title}
        </p>
        <p style={{ fontSize: 14, color: "#444", marginTop: 0 }}>
          Mărime: {item.selectedSize}
        </p>
      </div>
      <p
        style={{
          fontSize: 14,
          color: "#444",
          marginTop: 0,
          flex: "25%",
          textAlign: "right",
        }}
      >
        {(selectedSize?.promoPrice || selectedSize?.price || 0) *
          parseInt(item.selectedQuantity, 10)}{" "}
        RON
      </p>
    </div>
  );
};

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  const cartPrice = useTotalCartPrice();
  return (
    <div>
      <label className="flex-row" style={{ justifyContent: "space-between" }}>
        <label>Produse</label>
        <label>Total</label>
      </label>
      {cart.map((c) => (
        <CartItem key={c.id} item={c} />
      ))}
      <div style={{ margin: "10px 0" }}>
        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          <label style={{ background: "#fff", fontWeight: 500 }}>Suma</label>
          <label style={{ background: "#fff", fontWeight: 500 }}>
            {cartPrice.totalPrice} RON
          </label>
        </div>
        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          <label style={{ background: "#fff", fontWeight: 500 }}>Livrare</label>
          <label style={{ background: "#fff", fontWeight: 500 }}>
            {cartPrice.shippingFee} RON
          </label>
        </div>
        <label className="flex-row" style={{ justifyContent: "space-between" }}>
          <label>Total</label>
          <label>{cartPrice.totalPrice + cartPrice.shippingFee} RON</label>
        </label>
      </div>
    </div>
  );
}
