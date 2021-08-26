import mongoose from "mongoose";
import { CategoryDocument } from "./category";

type SizeType = "universal" | "hat" | "clothes";

interface ISize {
  size: string;
  price: number;
  promoPrice?: number;
  quantity: number;
}

export interface ProductDocument extends mongoose.Document {
  title: string;
  productCode: string;
  description: string;
  category?: CategoryDocument["_id"];
  images: string[];
  sizeType: SizeType;
  sizes: ISize[];
  color?: string;
  active: boolean;
}

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  productCode: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [String],
  sizeType: {
    type: String,
    enum: ["universal", "hat", "clothes"],
    default: "universal",
  },
  sizes: [
    {
      size: { type: String, required: true },
      price: { type: Number, required: true },
      promoPrice: Number,
      quantity: { type: Number, required: true },
    },
  ],
  color: String,
  active: { type: Boolean, default: true },
});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
