import mongoose, { Schema } from "mongoose";

type CategorySchemaType = {
  name: string;
};

const CategorySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategorySchemaType>("Category", CategorySchema);
