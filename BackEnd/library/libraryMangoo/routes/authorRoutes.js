
const express = require("express");
const router = express.Router();

// کنترلرها
const {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// گرفتن همه نویسنده‌ها
router.get("/", getAuthors);

// اضافه کردن نویسنده
router.post("/", createAuthor);

// آپدیت نویسنده
router.put("/:id", updateAuthor);

// حذف نویسنده
router.delete("/:id", deleteAuthor);

module.exports = router;
