import ProductSort from "./ProductSort";
import ViewModeButtons from "./ViewModeButtons";
import "./styles.css";

export default function () {
  return (
    <div className="products-sort">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4>
          <span>Produse: </span>1 – 12 din 43
        </h4>
        <ProductSort />
      </div>
      <ViewModeButtons />
    </div>
  );
}
