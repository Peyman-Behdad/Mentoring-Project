import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./configs/db";
import {testMySQLConnection} from "./configs/sql";

const PORT = process.env.PORT || 3000;

connectDB();
testMySQLConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
