import { ObjectId } from "mongodb";
import db from "../config/db.js";

const tasksCollection = db.collection("Tasks");

const Task = {
  async createTask(userId, title, description, priority) {
    const task = {
      userId: new ObjectId(userId),
      title,
      description,
      priority: priority || "Low",
      status: "pending",
      createdAt: new Date(),
      updatedAt: null,
      completedAt: null,
    };

    const result = await tasksCollection.insertOne(task);
    return result.insertedId;
  },

  async getTasksByUser(userId) {
    return await tasksCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
  },

  async updateTask(taskId, updates) {
    if (updates.status === "completed") {
      updates.completedAt = new Date();
    }

    updates.updatedAt = new Date();

    return await tasksCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: updates }
    );
  },

  async deleteTask(taskId) {
    return await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
  },
};

export default Task;
