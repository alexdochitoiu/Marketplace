import Button from "src/components/generic/Button";
import TitleBanner from "src/components/generic/TitleBanner";
import { FaAddressCard } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import "./styles.css";
import OrderSummary from "./OrderSummary";
import TermsAndConditions from "./TermsAndConditions";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import { Redirect } from "react-router";

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  if (cart.length === 0) {
    return <Redirect to="/cos-de-cumparaturi" />;
  }
  return (
    <div className="checkout">
      <TitleBanner title="Checkout" />
      <div
        className="container"
        style={{ marginTop: 20, display: "flex", flex: "1 1" }}
      >
        <div style={{ flex: "65%", margin: "0 6px" }}>
          <h4 className="contact-title" style={{ marginBottom: 20 }}>
            Date facturare
          </h4>
          <form className="contact-form checkout-form">
            <label className="flex-row">
              <FaAddressCard
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Persoana de contact
            </label>
            <div>
              <input type="text" placeholder="Nume *" />
              <input type="text" placeholder="Prenume *" />
            </div>
            <div>
              <input type="text" placeholder="Telefon *" />
              <input type="text" placeholder="Email *" />
            </div>
            <label className="flex-row" style={{ marginTop: 15 }}>
              <MdContactMail
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Adresa de facturare
            </label>
            <div>
              <input type="text" placeholder="Judet *" />
              <input type="text" placeholder="Localitate *" />
            </div>
            <div>
              <input type="text" placeholder="Adresa *" />
              <input type="text" placeholder="Cod poștal *" />
            </div>

            <label className="flex-row" style={{ marginTop: 15 }}>
              <CgNotes style={{ width: 20, height: 20, marginRight: 8 }} />
              Note comandă
            </label>
            <textarea
              style={{ width: "calc(100% - 20px)" }}
              rows={12}
              placeholder="Note comandă (opțional)"
            />
            <p
              style={{
                marginLeft: 10,
                fontSize: 13,
                color: "#666",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              * câmpuri obligatorii
            </p>
          </form>
        </div>
        <div style={{ flex: "35%", margin: "0 6px" }}>
          <h4 className="contact-title" style={{ marginBottom: 20 }}>
            COMANDA TA
          </h4>
          <div style={{ padding: 10, border: "1px solid #ccc" }}>
            <OrderSummary />
            <TermsAndConditions />
            <Button
              style={{
                border: "1px solid #ccc",
                padding: "12px 20px",
                width: "calc(100% - 40px)",
                textAlign: "center",
                background: "#444",
                color: "#fff",
                marginTop: 10,
              }}
              animation="slide"
              text="Plasează comanda"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
