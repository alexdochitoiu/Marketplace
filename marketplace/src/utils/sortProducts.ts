import { IState } from "src/redux/types";
import IProduct from "src/types/IProduct";

export const sortProducts = (
  products: IProduct[],
  sortBy: IState["productsSortBy"]
): IProduct[] => {
  switch (sortBy) {
    case "default":
      return products;
    case "asc-price":
      return products.sort((p1, p2) => {
        const minPrice1 = Math.min(...p1.sizes.map((s) => s.price));
        const minPrice2 = Math.min(...p2.sizes.map((s) => s.price));
        return minPrice1 - minPrice2;
      });
    case "desc-price":
      return products.sort((p1, p2) => {
        const maxPrice1 = Math.max(...p1.sizes.map((s) => s.price));
        const maxPrice2 = Math.max(...p2.sizes.map((s) => s.price));
        return maxPrice2 - maxPrice1;
      });
    case "sale":
      return products.sort((p1) => {
        return p1.sizes.find((s) => s.promoPrice) ? -1 : 1;
      });
    case "newest":
      return products.sort((p1, p2) => {
        return (
          new Date(p2.createdAt || 0).getTime() -
          new Date(p1.createdAt || 0).getTime()
        );
      });
    default:
      return products;
  }
};
