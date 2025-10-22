import connectDB from "../mongodb";

import { Food, FoodSchemaType } from "../models/Food";
import { Category } from "../models/Category";

export const createFood = async (foodData: {
  name: string;
  ingredients: string;
  price: number;
  image: string;
  categoryId: string;
}) => {
  await connectDB();
  const newFood = new Food({ ...foodData });
  await newFood.save();
  return true;
};

export const getAllFood = async () => {
  await connectDB();
  Category;
  const allnewFood: FoodSchemaType[] = await Food.find().populate("categoryId");
  return allnewFood;
};
