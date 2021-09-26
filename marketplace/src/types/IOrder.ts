import IProduct from "./IProduct";

export default interface IOrder {
  _id: string;
  number: string;
  status: "placed" | "preparing" | "sent";
  cart: Array<{
    product: IProduct;
    selectedSize: string;
    selectedQuantity: string;
  }>;
  clientInfo: {
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
    county: string;
    city: string;
    address: string;
    zipCode: string;
  };
  orderNotes?: string;
  createdAt: string;
  updatedAt: string;
}
