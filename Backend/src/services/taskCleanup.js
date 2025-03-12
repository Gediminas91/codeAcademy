import cron from "node-cron";
import { connectDB, db } from "../config/db.js";

const DELETE_AFTER_DAYS = 5;

const deleteCompletedTasks = async () => {
  try {
    if (!db) {
      console.error(
        "❌ Database connection not established. Skipping cleanup."
      );
      return;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - DELETE_AFTER_DAYS);
    expirationDate.setUTCHours(0, 0, 0, 0);

    const result = await db.collection("Tasks").deleteMany({
      status: "Completed",
      completedAt: { $lt: expirationDate },
    });

    if (result.deletedCount > 0) {
      console.log(`✅ Deleted ${result.deletedCount} completed tasks.`);
    } else {
      console.log("🚀 No completed tasks found for deletion.");
    }
  } catch (error) {
    console.error("❌ Failed to delete old completed tasks:", error);
  }
};

const startCleanup = async () => {
  await connectDB();
  console.log("🔄 Scheduled cleanup for completed tasks...");

  cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Running scheduled cleanup for completed tasks...");
    await deleteCompletedTasks();
  });
};

startCleanup();
