import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
  name: string;
  ingredients: string;
  price: number;
  category: string;
  image: string;
};

const FoodSchema = new Schema({
  name: String,
  ingredients: String,
  price: Number,
  category: String,
  image: String,
});

export const Food =
  mongoose.models.Food ||
  mongoose.model<FoodSchemaType>("Food", FoodSchema);
