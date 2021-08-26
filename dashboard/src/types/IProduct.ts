import ICategory from "./ICategory";

type SizeType = "universal" | "hat" | "clothes";

interface ISize {
  size: string;
  price: number;
  promoPrice?: number;
  quantity: number;
}

export default interface IProduct {
  _id: string;
  title: string;
  productCode: string;
  description: string;
  category?: ICategory;
  images: string[];
  sizeType: SizeType;
  sizes: ISize[];
  color?: string;
  active: boolean;
}

export interface IProductModel
  extends Omit<IProduct, "_id" | "category" | "colorGroup"> {
  category?: string;
}
