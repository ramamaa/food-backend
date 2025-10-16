import mongoose, { Schema } from "mongoose";

export type FoodSchemaType = {
  name: string;
  ingredients: string;
  price: number;
  categoryId: string;
  image: string;
};

const FoodSchema = new Schema({
  name: String,
  ingredients: String,
  price: Number,
  categoryId: {type: Schema.ObjectId,
    ref: "Category"
   },
  image: String,
}, {
  timestamps: true,
}
);

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchemaType>("Food", FoodSchema);
