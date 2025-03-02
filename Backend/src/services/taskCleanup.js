import cron from "node-cron";
import { db } from "../config/db.js";

const DELETE_AFTER_DAYS = 7;

const deleteCompletedTasks = async () => {
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - DELETE_AFTER_DAYS);

    const result = await db.collection("Tasks").deleteMany({
      status: "Completed",
      completedAt: { $lt: expirationDate },
    });

    console.log(`✅ Deleted ${result.deletedCount} completed tasks.`);
  } catch (error) {
    console.error("❌ Failed to delete old completed tasks:", error);
  }
};

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running cleanup for completed tasks...");
  await deleteCompletedTasks();
});

export default deleteCompletedTasks;
