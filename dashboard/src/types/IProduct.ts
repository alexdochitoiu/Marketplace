export default interface IProduct {
  _id: string;
  title: string;
  description: string;
  category?: string;
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  sizes: string[];
}
