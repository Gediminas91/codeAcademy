import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import taskRoutes from "./src/routes/tasks.js";
import authRoutes from "./src/routes/auth.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import "./src/services/taskCleanup.js";
import reportsRoutes from "./src/routes/reports.js";
import dashRoutes from "./src/routes/dashboard.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/dash", dashRoutes);

app.get("/", (req, res) => {
  res.json("TaskManager is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);
