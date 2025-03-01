import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import taskRoutes from "./src/routes/tasks.js";
import authRoutes from "./src/routes/auth.js";
import { deleteCompletedTasks } from "./src/utils/cleanupTasks.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);

setInterval(deleteCompletedTasks, 24 * 60 * 60 * 1000);

app.get("/", (req, res) => {
  res.json("TaskManager is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);
