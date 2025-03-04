import express from "express";
import { db } from "../config/db.js";
import { ObjectId } from "mongodb";
import { authenticateUser } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  try {
    const { status, priority, sortBy } = req.query;
    let query = { userId: req.user.userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    let tasksQuery = db.collection("Tasks").find(query);

    if (!sortBy) {
      tasksQuery = tasksQuery.sort({ title: 1 });
    }

    if (sortBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      const tasks = await tasksQuery.toArray();
      tasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

      const formattedTasks = tasks.map((task) => ({
        ...task,
        date: task.date
          ? new Date(task.date).toISOString()
          : new Date().toISOString(),
        updatedAt: task.updatedAt
          ? new Date(task.updatedAt).toISOString()
          : null,
        completedAt: task.completedAt
          ? new Date(task.completedAt).toISOString()
          : null,
      }));

      res.json(formattedTasks);
    } else if (sortBy === "dueDate") {
      tasksQuery = tasksQuery.sort({ dueDate: 1 });
    }

    const tasks = await tasksQuery.toArray();

    const formattedTasks = tasks.map((task) => ({
      ...task,
      date: task.date ? new Date(task.date).toISOString() : null,
      updatedAt: task.updatedAt ? new Date(task.updatedAt).toISOString() : null,
      completedAt: task.completedAt
        ? new Date(task.completedAt).toISOString()
        : null,
    }));

    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.post("/", authenticateUser, async (req, res) => {
  try {
    const newTask = {
      ...req.body,
      userId: req.user.userId,
      date: new Date(),
    };

    const result = await db.collection("Tasks").insertOne(newTask);
    res.json({ message: "Task added", taskId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = {
      ...req.body,
      updatedAt: new Date(),
    };

    if (req.body.status === "Completed") {
      updatedTask.completedAt = new Date();
    }

    const query = { _id: new ObjectId(taskId), userId: req.user.userId };
    const result = await db
      .collection("Tasks")
      .updateOne(query, { $set: updatedTask });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await db.collection("Tasks").deleteOne({
      _id: new ObjectId(taskId),
      userId: req.user.userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
