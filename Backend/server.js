import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("TaskManager is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);
