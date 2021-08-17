import React from "react";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import ProductCard from "../Products/ProductCard";

type TopProductType = "best-seller" | "sale" | "last-models" | "limited";

export default function () {
  const [animation, setAnimation] = React.useState(false);
  const [type, setType] = React.useState<TopProductType>("best-seller");
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    setAnimation(false);
    productService.getAll().then(({ data }) => {
      const prod =
        type === "best-seller" || type === "last-models"
          ? data
          : data.reverse();
      setProducts(prod);
      setAnimation(true);
    });
  }, [type]);

  return (
    <div className="container">
      <ul className="top-products-nav">
        <li
          className={type === "best-seller" ? "active" : ""}
          onClick={() => setType("best-seller")}
        >
          <h4>Cele mai vandute</h4>
        </li>
        <li
          className={type === "sale" ? "active" : ""}
          onClick={() => setType("sale")}
        >
          <h4>La reducere</h4>
        </li>
        <li
          className={type === "last-models" ? "active" : ""}
          onClick={() => setType("last-models")}
        >
          <h4>Ultimele modele</h4>
        </li>
        <li
          className={type === "limited" ? "active" : ""}
          onClick={() => setType("limited")}
        >
          <h4>Stoc limitat</h4>
        </li>
      </ul>
      <div
        className={`top-products ${
          animation ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
