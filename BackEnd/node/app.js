const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "js" },
];

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course is not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name is required");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course in not found");

  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("name is required and more than 3 charachter");
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course is not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(200).send("course deleted");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is start on port ${port}`);
});
