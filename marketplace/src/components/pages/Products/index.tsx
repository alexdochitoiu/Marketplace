import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import ProductCard from "./ProductCard";
import "./styles.css";

export default function () {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    productService.getAll().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <TitleBanner title="Articole" />
      <div className="container">
        {products.map((p, idx) => (
          <ProductCard key={idx} product={p} />
        ))}
      </div>
    </div>
  );
}