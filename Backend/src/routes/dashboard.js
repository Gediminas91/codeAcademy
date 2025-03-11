import express from "express";
import { authenticateUser } from "../middleWare/authMiddleware.js";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/count", authenticateUser, async (req, res) => {
  try {
    const tasksCollection = db.collection("Tasks");

    const totalTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
    });

    res.json({ totalTasks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching total tasks" });
  }
});

router.get("/status-counts", authenticateUser, async (req, res) => {
  try {
    const tasksCollection = db.collection("Tasks");

    const completed = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^completed$/i },
    });
    const inProgress = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^in progress$/i },
    });
    const pending = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^pending$/i },
    });

    const total = completed + inProgress + pending;
    const percentages = {
      completed: total > 0 ? ((completed / total) * 100).toFixed(1) : "0",
      inProgress: total > 0 ? ((inProgress / total) * 100).toFixed(1) : "0",
      pending: total > 0 ? ((pending / total) * 100).toFixed(1) : "0",
    };

    res.json({ completed, inProgress, pending, percentages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching task status counts" });
  }
});

router.get("/recent", authenticateUser, async (req, res) => {
  try {
    const tasksCollection = db.collection("Tasks");

    const recentTasks = await tasksCollection
      .find({ userId: req.user.userId })
      .sort({ date: -1, _id: -1 })
      .limit(3)
      .toArray();

    res.json(recentTasks);
  } catch (error) {
    console.error("Error fetching recent tasks:", error);
    res.status(500).json({ error: "Error fetching recent tasks" });
  }
});

export default router;
