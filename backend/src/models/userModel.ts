import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      default: new mongoose.Types.ObjectId("66cd844ccca894647897f4b1"),
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
