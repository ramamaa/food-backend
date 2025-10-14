import connectDB from "../mongodb";

import { Food } from "../models/Food";

export const createFood = async (foodData:{name:string, ingredients:string, price:number, image:string}) => {
  await connectDB();
  const newFood = new Food ({ ...foodData });
  await newFood.save();
  return newFood;
};

export const getAllFood = async () => {
  await connectDB();
  return await Food.find();
};

// export const deleteFood = async (name: string) => {
//   await connectDB();
//   const newCategory = new Category({ name });
//   await newCategory.save();
//   return newCategory;
// };
