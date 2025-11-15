import { createServer } from "http";

const PORT = 8000;

const server = createServer((req, res) => {
  res.end("Hello Backend!");
});

server.listen(PORT);
console.log("Server running...");