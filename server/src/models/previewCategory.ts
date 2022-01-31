import mongoose from "mongoose";
import { CategoryDocument } from "./category";

export interface PreviewCategoryDocument extends mongoose.Document {
  category: CategoryDocument["_id"];
  position: number;
}

const PreviewCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  position: Number,
});

const PreviewCategory = mongoose.model<PreviewCategoryDocument>(
  "PreviewCategory",
  PreviewCategorySchema
);

export default PreviewCategory;
