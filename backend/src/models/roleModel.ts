import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

export const Role = mongoose.model("Role", roleSchema);
