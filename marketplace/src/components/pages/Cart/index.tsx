import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import Button from "src/components/generic/Button";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import CartItem from "./CartItem";
import SnackBar from "src/components/generic/SnackBar";
import { doChangeCart } from "src/redux/actions";
import { AiFillDelete, AiFillInfoCircle, AiFillShopping } from "react-icons/ai";
import TotalPrice from "./TotalPrice";

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [snack, setSnack] = React.useState<React.ReactNode | null>(null);

  const handleRemove = (itemId: string) => {
    dispatch(doChangeCart(cart.filter((c) => c.id !== itemId)));
    setSnack(
      <span className="flex-row">
        <AiFillDelete className="snack-icon" />
        Produsul a fost șters din coș
      </span>
    );
  };

  const handleChageQuantity = (itemId: string, e) => {
    const newCart = [...cart];
    const index = newCart.findIndex((c) => c.id === itemId);
    if (index !== -1) {
      newCart[index].selectedQuantity = e.target.value;
      dispatch(doChangeCart(newCart));
      setSnack(
        <span className="flex-row">
          <AiFillInfoCircle className="snack-icon" />
          Cantitatea a fost modificată
        </span>
      );
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          height: "calc(100vh - 300px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -30,
          background: "#eee",
        }}
      >
        <h4
          style={{
            fontSize: 30,
            color: "#444",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AiOutlineShopping
            style={{ color: "var(--primary)", fontSize: 50, marginRight: 10 }}
          />{" "}
          Cosul de cumparaturi
        </h4>
        <p style={{ fontSize: 18 }}>
          Se pare ca nu ai niciun produs adaugat in cosul de cumparaturi.
        </p>
        <Button
          href="/produse"
          text="Cumpara"
          animation="slide"
          style={{ border: "1px solid #ccc" }}
        />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: -30, background: "#f5f5f5", paddingBottom: 30 }}>
      <SnackBar
        message={snack}
        open={Boolean(snack)}
        onClose={() => setSnack(null)}
      />
      <TitleBanner title="Cos de cumparaturi" />
      <div className="container" style={{ marginTop: 30 }}>
        <h4
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          Produse în coș ({cart.length})
        </h4>
        {cart.map((c) => (
          <CartItem
            item={c}
            onRemove={handleRemove}
            onChangeQuantity={handleChageQuantity}
          />
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TotalPrice cart={cart} />
          <div
            className="flex-row"
            style={{
              width: 420,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <a
              href="/produse"
              className="flex-row link-btn"
              style={{ marginRight: 16 }}
            >
              <AiFillShopping style={{ marginRight: 5 }} />
              Continuă cumpărăturile
            </a>
            <Button
              animation="slide"
              text="Pasul următor"
              style={{
                border: "1px solid #ccc",
                padding: "12px 40px",
                background: "#555",
                color: "#fff",
              }}
              href="/checkout"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
