import mongoose from "mongoose";
import { ProductDocument } from "./product";

export interface OrderDocument extends mongoose.Document {
  number: string;
  status: "placed" | "preparing" | "sent";
  cart: Array<{
    product: ProductDocument["_id"];
    selectedSize: string;
    selectedQuantity: string;
    orderType: "comanda" | "precomanda";
  }>;
  cartPrice: {
    shippingFee: number;
    totalPrice: number;
    totalDiscount: number;
  };
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
  payMethod: "ramburs" | "transfer";
}

const OrderSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["placed", "preparing", "sent"],
      default: "placed",
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedSize: String,
        selectedQuantity: String,
        orderType: {
          type: String,
          enum: ["comanda", "precomanda"],
          default: "comanda",
        },
      },
    ],
    cartPrice: {
      shippingFee: Number,
      totalPrice: Number,
      totalDiscount: Number,
    },
    clientInfo: {
      lastName: String,
      firstName: String,
      phone: String,
      email: String,
      county: String,
      city: String,
      address: String,
      zipCode: String,
    },
    orderNotes: String,
    payMethod: {
      type: String,
      enum: ["ramburs", "transfer"],
      default: "ramburs",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
export default Order;
