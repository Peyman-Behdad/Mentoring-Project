import mongoose, { Schema } from "mongoose";

interface AuthorEntity   {
  name: string;
  gender: string;
  age: number;
}

const authorSchema = new Schema<AuthorEntity>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
