import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    publisher: { type: String, required: true },
    image: { type: String },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
