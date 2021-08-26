import IProduct from "src/types/IProduct";

export const filterProducts = (
  products: IProduct[],
  priceInterval: [number, number],
  title: string
): IProduct[] => {
  return products
    .filter((p) => p.title.toLowerCase().includes(title.toLowerCase()))
    .filter((p) => {
      const minPrice = Math.min(...p.sizes.map((s) => s.promoPrice || s.price));
      const maxPrice = Math.max(...p.sizes.map((s) => s.promoPrice || s.price));
      console.log({ minPrice, maxPrice });
      return priceInterval[0] <= minPrice && priceInterval[1] >= maxPrice;
    });
};
