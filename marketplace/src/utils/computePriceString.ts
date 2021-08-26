import IProduct from "src/types/IProduct";

export default function (
  sizes: IProduct["sizes"],
  field: "price" | "promoPrice"
): string {
  if (sizes.length === 0) {
    return "";
  }
  if (sizes.length === 1) {
    return `${sizes[0][field]}`;
  }

  let arr = sizes
    .filter((s) => !!s[field])
    .map((s) => parseInt(`${s[field]}`, 10));

  if (field === "promoPrice") {
    const priceArray = sizes
      .filter((s) => !!s.price)
      .map((s) => parseInt(`${s.price}`, 10));
    arr = [...arr, ...priceArray];
  }
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) {
    return `${min}`;
  }
  return `${min} - ${max}`;
}
