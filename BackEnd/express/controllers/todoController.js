let todos = [];
let currentId = 0;

// Show items
exports.getTodos = (req, res) => {
  if (todos.length === 0) {
    return res.json({ message: "هیچ آیتمی وجود ندارد", todos: [] });
  }
  res.json(todos);
};

// Create items
exports.createTodo = (req, res) => {
  currentId++;
  const newTodo = {
    id: currentId,
    text: req.body.text,
    status: false,
  };
  todos.push(newTodo);
  res.status(201).json({message: "ایتم با موفقیت اضافه شد"});
};

// Edit items
exports.updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.text = req.body.text ?? todo.text;
  todo.status = req.body.status ?? todo.status;

  res.json(todo);
};

// Delete items
exports.deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some((item) => item.id === id);

  if (!exists) return res.status(404).json({ message: "Todo not found" });

  todos = todos.filter((t) => t.id !== id);
  res.json({ message: "Todo deleted successfully" });
};
