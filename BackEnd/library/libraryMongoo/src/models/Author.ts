import mongoose, { Schema } from "mongoose";

export interface AuthorEntity   {
  name: string;
  gender: string;
  age: number;
}

const authorSchema = new Schema<AuthorEntity>(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
