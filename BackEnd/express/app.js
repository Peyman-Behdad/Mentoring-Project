const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

let todos = [
  { id: 1, text: "buy car", status: "completed" },
  { id: 2, text: "go shopping", status: "not completed" },
];

// Show items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add items
let countId = 3;
app.post("/todos", (req, res) => {
  const newTodo = {
    id: countId++,
    text: req.body.text,
    status: req.body.status,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Edit items
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: "To do is not found" });
  }

  todo.text = req.body.text ?? todo.text;
  todo.status = req.body.status ?? todo.status;

  res.json(todo);
});

// Delete items
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((item) => item.id !== id);

  res.json({ message: "Delete item successfully" });
});

app.listen(PORT, () => {
  console.log("Conection successfully");
});
