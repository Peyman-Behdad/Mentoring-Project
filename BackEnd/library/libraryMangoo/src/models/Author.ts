import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
