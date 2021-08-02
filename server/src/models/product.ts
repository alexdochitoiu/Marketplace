import mongoose from "mongoose";
import { CategoryDocument } from "./category";

export interface ProductDocument extends mongoose.Document {
  title: string;
  description: string;
  category: CategoryDocument["_id"];
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  sizes: string[];
}

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [String],
  price: { type: Number, required: true },
  promoPrice: Number,
  quantity: { type: Number, required: true },
  size: [String],
});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
