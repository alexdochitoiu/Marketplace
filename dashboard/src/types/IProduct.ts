import ICategory from "./ICategory";

export default interface IProduct {
  _id: string;
  title: string;
  description: string;
  category?: ICategory;
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  sizes: string[];
}

export interface IProductModel {
  title: string;
  description: string;
  category?: string;
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  sizes: string[];
}
