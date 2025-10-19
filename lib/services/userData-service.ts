import { UserData, UserDataSchemaType } from "../models/UserData";
import connectDB from "../mongodb";

export const getAllUserData = async () => {
  await connectDB();
  return await UserData.find();
};

export const createUserData = async (userData: UserDataSchemaType) => {
  await connectDB();
  const newUserData = new UserData({ ...userData });
  await newUserData.save();
  return true;
};
