import "./styles.css";

export default function () {
  return (
    <div className="total-price-root">
      <div className="flex-row">
        <h4>Suma</h4>
        <h4>5000 RON</h4>
      </div>
      <div className="flex-row">
        <h4>Livrare</h4>
        <h4>25 RON</h4>
      </div>
      <div className="flex-row" style={{ background: "#eee" }}>
        <h4 style={{ fontWeight: 600 }}>Total</h4>
        <h4 style={{ color: "var(--primary)", fontSize: 19 }}>525 RON</h4>
      </div>
      <div className="flex-row" style={{ color: "#e40606", marginTop: 10 }}>
        <h4>Economisești</h4>
        <h4 style={{ fontWeight: 500, fontFamily: "Poppins, sans-serif" }}>
          200 RON
        </h4>
      </div>
    </div>
  );
}
