import mongoose, { Schema } from "mongoose";

export type UserDataSchemaType = {
  email: string;
  password: string;
};

const UserDataSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const UserData =
  mongoose.models.UserData ||
  mongoose.model<UserDataSchemaType>("UserData", UserDataSchema);
