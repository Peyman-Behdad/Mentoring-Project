import mongoose, { Schema } from "mongoose";

export interface BookEntity {
  title: string;
  publisher: string;
  image: string;
  author: Object;
}

const bookSchema = new Schema<BookEntity>(
  {
    title: { type: String, required: true },
    publisher: { type: String, required: true },
    image: { type: String },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
