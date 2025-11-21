const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// ساخت مدل
module.exports = mongoose.model("Author", AuthorSchema);
