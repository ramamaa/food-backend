import connectDB from "../mongodb";

import { Food } from "../models/Food";

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
  return await Food.find();
};

export const deleteFood = async (foodData: {
  name: string;
  ingredients: string;
  price: number;
  image: string;
  categoryId: string;
}) => {
  await connectDB();
  const newFood = new Food({ foodData });
  await newFood.save();
  return newFood;
};

export const updateFood = async (foodData: {
  name: string;
  ingredients: string;
  price: number;
  image: string;
  categoryId: string;
}) => {
  await connectDB();
  const updatedFood = new Food({ foodData });
  await updatedFood.save();
  return updatedFood;
};
