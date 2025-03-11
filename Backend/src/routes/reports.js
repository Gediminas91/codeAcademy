import express from "express";
import { authenticateUser } from "../middleWare/authMiddleware.js";
import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/summary", authenticateUser, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const tasksCollection = db.collection("Tasks");

    const totalTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
    });
    const completedTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^completed$/i },
    });
    const pendingTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^pending$/i },
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    console.error("Error fetching task summary:", error);
    res.status(500).json({ message: "Failed to fetch task summary" });
  }
});

router.get("/trends", authenticateUser, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const tasksCollection = db.collection("Tasks");

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    const weeklyTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });
    const monthlyTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
    const yearlyTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      weeklyTasks,
      monthlyTasks,
      yearlyTasks,
    });
  } catch (error) {
    console.error("Error fetching task trends:", error);
    res.status(500).json({ message: "Failed to fetch task trends" });
  }
});

router.get("/completion-timeline", authenticateUser, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const tasksCollection = db.collection("Tasks");

    await tasksCollection.updateMany(
      { status: { $regex: /^completed$/i }, completedAt: null },
      { $set: { completedAt: new Date() } }
    );

    const tasks = await tasksCollection
      .find({ userId: req.user.userId, completedAt: { $ne: null } })
      .sort({ completedAt: 1 })
      .toArray();

    const timelineData = tasks.map((task) => ({
      taskId: task._id,
      title: task.title,
      completedAt: task.completedAt,
    }));

    res.json({ timelineData });
  } catch (error) {
    console.error("Error fetching completion timeline:", error);
    res.status(500).json({ message: "Failed to fetch completion timeline" });
  }
});

router.get("/productivity-score", authenticateUser, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.userId);
    const tasksCollection = db.collection("Tasks");

    const totalTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
    });
    const completedTasks = await tasksCollection.countDocuments({
      userId: req.user.userId,
      status: { $regex: /^completed$/i },
    });

    const productivityScore = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    res.json({ productivityScore });
  } catch (error) {
    console.error("Error fetching productivity score:", error);
    res.status(500).json({ message: "Failed to fetch productivity score" });
  }
});

export default router;
