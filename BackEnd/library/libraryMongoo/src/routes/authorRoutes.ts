import { Router } from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorsSql,
  getAuthorByIdSql,
  createAuthorSql,
  updateAuthorSql,
  deleteAuthorSql,
} from "../controllers/authorController";

const router = Router();

router.get("/", getAuthorsSql);
router.get("/:id", getAuthorById);
router.post("/", createAuthorSql);
router.put("/:id", updateAuthorSql);
router.delete("/:id", deleteAuthorSql);

export default router;
