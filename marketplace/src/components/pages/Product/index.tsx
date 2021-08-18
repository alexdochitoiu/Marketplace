import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import { useRouteMatch } from "react-router-dom";

export default function () {
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    const { productId } = router.params;
    if (productId) {
      productService.getById(productId).then(({ data }) => setProduct(data));
    }
  }, []);

  return (
    <div>
      <TitleBanner title={product?.title || ""} />
    </div>
  );
}
