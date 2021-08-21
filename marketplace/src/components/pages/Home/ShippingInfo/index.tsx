import Button from "src/components/generic/Button";
import "./ShippingInfo.styles.css";

export default function () {
  return (
    <div className="shipping-info">
      <div className="container">
        <h3>Informatii livrare</h3>
        <p>
          Produsele sunt livrate prin curier.
          <br /> Termenul de livrare pentru produsele din stoc este de 1-2 zile
          lucratoare, iar pentru cele pe comanda, 5-10 zile lucratoare.
        </p>
        <Button animation="slide" text="Cumpara" href="/produse" style={{ marginTop: 50 }} />
      </div>
    </div>
  );
}
