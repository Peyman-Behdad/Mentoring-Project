const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // رابطه با نویسنده
    ref: "Author",
    required: true
  }
});

module.exports = mongoose.model("Book", BookSchema);
