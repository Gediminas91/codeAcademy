import { db } from "../config/db.js";

const DELETE_AFTER_DAYS = 7;

export const deleteCompletedTasks = async () => {
  try {
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() - DELETE_AFTER_DAYS);

    const data = db.collection("Tasks").deleteMany({
      status: "Completed",
      updatedAt: { $lt: expirationDate },
    });
    console.log(`✅ Deleted ${result.deletedCount} completed tasks.`);
  } catch (error) {
    console.error("❌ Failed to delete old completed tasks:", error);
  }
};
