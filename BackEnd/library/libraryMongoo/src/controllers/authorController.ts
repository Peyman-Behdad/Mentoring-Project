import { Request, Response } from "express";
import Author, { AuthorEntity } from "../models/Author";
import pool from "../configs/sql";
import { z } from "zod";

const authorSchema = z.object({
  name: z.string().min(3, "نام نویسنده باید بیشتر از ۳ کاراکتر باشد"),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  age: z
    .number()
    .min(18, "سن نویسنده باید بیشتر از ۱۸ سال باشد")
    .max(80, "سن نویسنده باید کمتر از ۸۰ سال باشد")
    .int()
    .positive()
    .optional(),
});

// get all author by Mongoo
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    if (authors.length === 0) {
      return res.json({ message: "نوینسده ای وجود ندارد" });
    } else {
      res.json(authors);
    }
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

//get author by Id Mongoo
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.json({ message: "نوینسده ای وجود ندارد" });
    } else {
      res.json(author);
    }
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// get all author by Sql
export const getAuthorsSql = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM authors");
    if ((rows as any[]).length === 0) {
      return res.json({ message: "نوینسده ای وجود ندارد" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در دریافت نویسنده‌ها" });
  }
};

// get author by Id by sql
export const getAuthorByIdSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: "نویسنده یافت نشد" });
    }
    res.json((rows as AuthorEntity[])[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در دریافت نویسنده" });
  }
};

// create author by Mongoo
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const parsedData = authorSchema.parse(req.body);
    const author = await Author.create(parsedData);
    res.status(201).json(author);
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// create author by Sql
export const createAuthorSql = async (req: Request, res: Response) => {
  try {
    const parsedData = authorSchema.parse(req.body);
    const { name, gender, age } = parsedData;
    const [result] = await pool.query(
      "INSERT INTO authors (name, gender, age) VALUES (?, ?, ?)",
      [name, gender, age]
    );
    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [
      (result as any).insertId,
    ]);
    res.status(201).json((rows as AuthorEntity[])[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در ایجاد نویسنده" });
  }
};

// update author by Mongoo
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = authorSchema.parse(req.body);
    const author = await Author.findByIdAndUpdate(id, parsedData, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ message: "نویسنده یافت نشد" });
    }
    res.json(author);
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// update author by Sql
export const updateAuthorSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = authorSchema.partial().parse(req.body);
    const { name, gender, age } = parsedData;
    const [result] = await pool.query(
      "UPDATE authors SET name = ?, gender = ?, age = ? WHERE id = ?",
      [name, gender, age, id]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "نویسنده یافت نشد" });
    }
    const [rows] = await pool.query("SELECT * FROM authors WHERE id = ?", [id]);
    res.json((rows as AuthorEntity[])[0]);
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// delete author by Mongoo
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "نویسنده یافت نشد" });
    }
    res.json({ message: "نویسنده حذف شد" });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};

// delete author by sql
export const deleteAuthorSql = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM authors WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "نویسنده یافت نشد" });
    }
    res.json({ message: "نویسنده حذف شد" });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ message: "خطایی در سرور رخ داده است" });
  }
};
