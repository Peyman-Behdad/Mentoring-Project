import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksSql,
  getBookByIdSql,
  createBookSql
} from "../controllers/bookController";

const router = Router();

router.get("/", getBooksSql);
router.get("/:id", getBookByIdSql);
router.post("/", createBookSql);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
