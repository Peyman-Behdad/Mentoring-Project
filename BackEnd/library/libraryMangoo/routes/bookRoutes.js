const express = require("express");
const router = express.Router();

const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// گرفتن همه کتاب‌ها
router.get("/", getBooks);

// اضافه کردن کتاب
router.post("/", createBook);

// آپدیت کتاب
router.put("/:id", updateBook);

// حذف کتاب
router.delete("/:id", deleteBook);

module.exports = router;
