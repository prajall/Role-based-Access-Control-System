import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  name: { type: String, required: true },
});

export const Permission = mongoose.model("modules", moduleSchema);
