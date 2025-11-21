const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// اتصال به دیتابیس
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// app.get("/test", (req, res) => {
//   res.json({ message: "Server is running ✅" });
// });

// روت‌ها
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
