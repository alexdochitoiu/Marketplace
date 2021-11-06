import React from "react";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import ProductCard from "../Products/ProductsList/ProductCard";
import { sortProducts } from "src/utils";
import useWindowDimensions from "src/utils/customHooks/useWindowDimensions";
import Select from "src/components/generic/Select";

type TopProductType = "best-seller" | "sale" | "last-models" | "limited";

const getTopProducts = (
  products: IProduct[],
  type: TopProductType
): IProduct[] => {
  if (type === "sale") {
    return products
      .filter((p) => p.sizes.find((s) => s.promoPrice))
      .slice(0, 4);
  }
  if (type === "limited") {
    return products
      .filter((p) => p.sizes.find((s) => s.quantity > 0 && s.quantity < 3))
      .slice(0, 4);
  }
  if (type === "last-models") {
    return sortProducts(products, "newest").slice(0, 4);
  }

  return products.slice(0, 4);
};

export default function () {
  const [animation, setAnimation] = React.useState(false);
  const [type, setType] = React.useState<TopProductType>("best-seller");
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const windowSize = useWindowDimensions();

  React.useEffect(() => {
    setAnimation(false);
    productService.getAll().then(({ data }) => {
      setProducts(getTopProducts(data, type));
      setAnimation(true);
    });
  }, [type]);

  return (
    <div className="container">
      {windowSize.width > 428 ? (
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
      ) : (
        <Select
          options={[
            { value: "best-seller", label: "Cele mai vandute" },
            { value: "sale", label: "La reducere" },
            { value: "last-models", label: "Ultimele modele" },
            { value: "limited", label: "Stoc limitat" },
          ]}
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          style={{ display: "flex", textAlign: "center" }}
        />
      )}
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
