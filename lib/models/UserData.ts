import mongoose, { Schema } from "mongoose";

export type UserDataSchemaType = {
  email: string;
  password: string;
};

const UserDataSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phoneNumber: { type: String },
    role: { type: String, required: true, enum: ["USER", "ADMIN"] },
  },
  {
    timestamps: true,
  }
);

export const UserData =
  mongoose.models.UserData ||
  mongoose.model<UserDataSchemaType>("UserData", UserDataSchema);
