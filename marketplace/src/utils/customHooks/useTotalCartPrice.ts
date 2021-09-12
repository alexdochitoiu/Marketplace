import React from "react";
import { RootState } from "src/redux/types";
import * as productService from "src/services/product";
import { useSelector } from "react-redux";

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  const shippingFee = 50;
  const [data, setData] = React.useState({
    totalPrice: 0,
    totalDiscount: 0,
  });
  React.useEffect(() => {
    setData({
      totalPrice: 0,
      totalDiscount: 0,
    });
    cart.map((c) => {
      productService.getById(c.productId).then(({ data }) => {
        const size = data.sizes.find((s) => s.size === c.selectedSize);
        if (size) {
          const price = size.promoPrice || size.price;
          setData((oldData) => ({
            totalPrice:
              oldData.totalPrice + price * parseInt(c.selectedQuantity),
            totalDiscount:
              oldData.totalDiscount +
              (size.price - price) * parseInt(c.selectedQuantity),
          }));
        }
      });
    });
  }, [cart]);
  return {
    ...data,
    shippingFee,
  };
}
