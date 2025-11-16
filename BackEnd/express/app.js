const express = require("express");
const app = express();
const logger = require("./middlewares/logger");
const todoRoutes = require("./routes/todoRoutes");
const PORT = 3000;

app.use(express.json());
app.use(logger); // استفاده از middleware

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
