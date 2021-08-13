import mongoose from "mongoose";
import { CategoryDocument } from "./category";
import { ColorGroupDocument } from "./colorGroup";

type SizeType = "universal" | "hat" | "clothes";

export interface ProductDocument extends mongoose.Document {
  title: string;
  description: string;
  category?: CategoryDocument["_id"];
  images: string[];
  price: number;
  promoPrice?: number;
  quantity: number;
  sizeType: SizeType;
  sizes: string[];
  color?: string;
  colorGroup?: ColorGroupDocument["_id"];
  active: boolean;
}

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [String],
  price: { type: Number, required: true },
  promoPrice: Number,
  quantity: { type: Number, required: true },
  sizeType: {
    type: String,
    enum: ["universal", "hat", "clothes"],
    default: "universal",
  },
  sizes: [String],
  color: String,
  colorGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ColorGroup",
  },
  active: { type: Boolean, default: true },
});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
