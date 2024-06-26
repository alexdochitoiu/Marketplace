import ICategory from "./ICategory";

type SizeType = "universal" | "hat" | "clothes";

export interface ISize {
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
  createdAt?: string;
  updatedAt?: string;
}
