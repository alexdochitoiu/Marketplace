import IProduct from "src/types/IProduct";
import computePriceString from "./computePriceString";
import { filterProducts } from "./filterProducts";
import { sortProducts } from "./sortProducts";
import { addOrRemoveFromWishlist, isAddedToWishlist } from "./wishlist";

const isPromo = (product: IProduct): boolean =>
  !!product.sizes.find((s) => s.promoPrice);

const isOutOfStock = (product: IProduct): boolean =>
  product.sizes.reduce((acc, curr) => acc + curr.quantity, 0) <= 0;

export {
  isPromo,
  isOutOfStock,
  computePriceString,
  sortProducts,
  filterProducts,
  addOrRemoveFromWishlist,
  isAddedToWishlist,
};
