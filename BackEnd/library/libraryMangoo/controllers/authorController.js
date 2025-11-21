const Author = require("../models/Author");

// GET همه نویسنده‌ها
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    if (authors.length === 0) {
      return res.json({ message: "هیچ نویسنده‌ای وجود ندارد", authors: [] });
    }
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST اضافه کردن نویسنده جدید
exports.createAuthor = async (req, res) => {
  try {
    const { name, gender, age } = req.body;
    const newAuthor = new Author({ name, gender, age });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT ویرایش نویسنده
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "نویسنده پیدا نشد" });

    author.name = req.body.name ?? author.name;
    author.gender = req.body.gender ?? author.gender;
    author.age = req.body.age ?? author.age;

    await author.save();
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE حذف نویسنده
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "نویسنده پیدا نشد" });

    await author.deleteOne();
    res.json({ message: "نویسنده حذف شد" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
