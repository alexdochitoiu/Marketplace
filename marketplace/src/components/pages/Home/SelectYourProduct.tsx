import React from "react";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import ProductCard from "../Products/ProductsList/ProductCard";
import Button from "src/components/generic/Button";

export default function () {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    productService.getAll().then(({ data }) => {
      setProducts(data.slice(0, 8));
    });
  }, []);

  return (
    <div className="container">
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 35 }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          animation="slide"
          text="Toate produsele"
          href="/produse/section/all"
          style={{
            marginTop: 30,
            background: "#333",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
}
