import { Request, Response } from "express";
import Book from "../models/Book";

// get books
export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find().populate("author");
  res.json(books);
};

// create books
export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

// update books
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return res.status(404).json({ message: "کتاب یافت نشد" });
  }

  res.json(book);
};

// delete books
export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "کتاب یافت نشد" });
  }

  res.json({ message: "کتاب حذف شد" });
};
