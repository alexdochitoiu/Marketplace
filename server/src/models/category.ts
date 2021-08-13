import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  title: string;
  description?: string;
  image?: string;
}

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  image: String,
});

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
