import IProduct from "src/types/IProduct";

const noSpecialChars = (text: string) =>
  text
    .replace(/(ă|â)/g, "a")
    .replace("ș", "s")
    .replace("î", "i")
    .replace("ț", "t");

const tr = (text: string) => noSpecialChars(text.toLowerCase());

export const filterProducts = (
  products: IProduct[],
  priceInterval: [number, number] | null,
  title: string
): IProduct[] => {
  let result = products;
  if (title) {
    result = result.filter((p) => tr(p.title).includes(tr(title)));
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
