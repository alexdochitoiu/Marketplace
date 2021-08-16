import ICategory from "./ICategory";
import IColorGroup from "./IColorGroup";

type SizeType = "universal" | "hat" | "clothes";

export default interface IProduct {
  _id: string;
  title: string;
  description: string;
  category?: ICategory;
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  color?: string;
  colorGroup?: IColorGroup;
  sizeType: SizeType;
  sizes: string[];
  active: boolean;
}