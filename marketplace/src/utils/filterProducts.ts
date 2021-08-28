import IProduct from "src/types/IProduct";

export const filterProducts = (
  products: IProduct[],
  priceInterval: [number, number] | null,
  title: string
): IProduct[] => {
  let result = products;
  if (title) {
    result = result.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (priceInterval) {
    result = result.filter((p) => {
      const minPrice = Math.min(...p.sizes.map((s) => s.promoPrice || s.price));
      const maxPrice = Math.max(...p.sizes.map((s) => s.promoPrice || s.price));
      return priceInterval[0] <= minPrice && priceInterval[1] >= maxPrice;
    });
  }
  return result;
};
