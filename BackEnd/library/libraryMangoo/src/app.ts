import express, { Application } from "express";
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";

const app: Application = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

export default app;
