import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksSql,
  getBookByIdSql,
  createBookSql,
  updateBookSql,
  deleteBookSql
} from "../controllers/bookController";

const router = Router();

router.get("/", getBooksSql);
router.get("/:id", getBookByIdSql);
router.post("/", createBookSql);
router.put("/:id", updateBookSql);
router.delete("/:id", deleteBookSql);

export default router;
