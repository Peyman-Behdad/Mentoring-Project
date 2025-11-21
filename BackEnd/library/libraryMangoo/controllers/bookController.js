const Book = require("../models/Book");
const Author = require("../models/Author");

// GET همه کتاب‌ها
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author"); // populate نویسنده را به صورت کامل می‌آورد
    if (books.length === 0) {
      return res.json({ message: "هیچ کتابی وجود ندارد", books: [] });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST اضافه کردن کتاب جدید
exports.createBook = async (req, res) => {
  try {
    const { image, title, publisher, author } = req.body;

    // چک کردن اینکه نویسنده وجود داره
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) return res.status(404).json({ message: "نویسنده پیدا نشد" });

    const newBook = new Book({ image, title, publisher, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT ویرایش کتاب
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "کتاب پیدا نشد" });

    book.image = req.body.image ?? book.image;
    book.title = req.body.title ?? book.title;
    book.publisher = req.body.publisher ?? book.publisher;
    book.author = req.body.author ?? book.author;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE حذف کتاب
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "کتاب پیدا نشد" });

    await book.deleteOne();
    res.json({ message: "کتاب حذف شد" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
