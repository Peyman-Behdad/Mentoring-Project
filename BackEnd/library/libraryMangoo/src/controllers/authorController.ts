import { Request, Response } from "express";
import Author from "../models/Author";

// get author
export const getAuthors = async (req: Request, res: Response) => {
  const authors = await Author.find();
  res.json(authors);
};

// create author
export const createAuthor = async (req: Request, res: Response) => {
  const author = await Author.create(req.body);
  res.status(201).json(author);
};

// update author
export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = await Author.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!author) {
    return res.status(404).json({ message: "نویسنده یافت نشد" });
  }

  res.json(author);
};

// delete author
export const deleteAuthor = async (req: Request, res: Response) => {
  const author = await Author.findByIdAndDelete(req.params.id);

  if (!author) {
    return res.status(404).json({ message: "نویسنده یافت نشد" });
  }

  res.json({ message: "نویسنده حذف شد" });
};
