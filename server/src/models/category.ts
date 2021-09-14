import mongoose from "mongoose";

export type SectionType = "men" | "women" | "kids" | "other";

export interface CategoryDocument extends mongoose.Document {
  title: string;
  section: SectionType;
  description?: string;
  image?: string;
}

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  section: {
    type: String,
    enum: ["men", "women", "kids", "other"],
    default: "other",
  },
  description: String,
  image: String,
});

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
