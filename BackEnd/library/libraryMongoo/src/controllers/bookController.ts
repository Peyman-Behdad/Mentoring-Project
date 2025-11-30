import { Request, Response } from "express";
import Book, { BookEntity } from "../models/Book";
import pool from "../configs/sql";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(3, "نام کتاب باید بیشتر از ۳ کاراکتر باشد"),
  publisher: z
    .string()
    .min(3, "نام انتشارات باید بیشتر از ۳ کاراکتر باشد")
    .max(100, "نام انتشارات باید کمتر از ۱۰۰ کاراکتر باشد"),
  image: z.string(),
  author_id: z.string().optional(),
});

// get all books by mongoo
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("author");
    if (books.length === 0) {
      return res.json({ message: "کتابی وجود ندارد" });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// get book by Id Mongoo
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author");
    if (!book) {
      return res.json({ message: "کتابی وجود ندارد" });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// get all books by Sql
export const getBooksSql = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    if ((rows as any[]).length === 0) {
      return res.json({ message: "کتابی وجود ندارد" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در دریافت کتاب ها" });
  }
};

// get book by Id by Sql
export const getBookByIdSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: "کتاب یافت نشد" });
    }
    res.json((rows as BookEntity[])[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در دریافت کتاب" });
  }
};

// create books Mongooo
export const createBook = async (req: Request, res: Response) => {
  try {
    const parsedData = bookSchema.parse(req.body);
    const book = await Book.create(parsedData);
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// create books by Sql
export const createBookSql = async (req: Request, res: Response) => {
  try {
    const parsedData = bookSchema.parse(req.body);
    const { title, publisher, image, author_id } = parsedData;
    const [result] = await pool.query(
      "INSERT INTO books (title, publisher, image, author_id) VALUES (?, ?, ?, ?)",
      [title, publisher, image, author_id]
    );
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [
      (result as any).insertId,
    ]);
    res.status(201).json((rows as BookEntity[])[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در ایجاد کتاب" });
  }
};

// update books by Mongoo
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = bookSchema.parse(req.body);
    const book = await Book.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "کتاب یافت نشد" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// update book by Sql
export const updateBookSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = bookSchema.partial().parse(req.body);
    const { title, publisher, image, author_id } = parsedData;
    const [result] = await pool.query(
      "UPDATE books SET title = ?, publisher = ?, image = ?, author_id = ? WHERE id = ?",
      [title, publisher, image, author_id, id]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "کتاب یافت نشد" });
    }
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    res.json((rows as BookEntity[])[0]);
  } catch (error) {
    console.error("Error updating books:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// delete books by Mongoo
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "کتاب یافت نشد" });
    }
    res.json({ message: "کتاب حذف شد" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// delete books by Sql
export const deleteBookSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "کتاب یافت نشد" });
    }
    res.json({ message: "کتاب حذف شد" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};
