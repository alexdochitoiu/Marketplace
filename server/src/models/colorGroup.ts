import mongoose from "mongoose";

export interface ColorGroupDocument extends mongoose.Document {
  title: string;
}

const ColorGroupSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

const ColorGroup = mongoose.model<ColorGroupDocument>(
  "ColorGroup",
  ColorGroupSchema
);

export default ColorGroup;
