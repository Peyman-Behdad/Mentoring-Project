const express = require("express");
require("dotenv").config();
const app = express();

const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "js" },
];

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.get("/api/courses", (req, res) => {
  res.send(["html", "css", "js"]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course is not found");
  res.send(course);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is start on port ${port}`);
});
