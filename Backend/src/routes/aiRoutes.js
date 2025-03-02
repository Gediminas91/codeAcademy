import express from "express";
import { authenticateUser } from "../middleWare/authMiddleware.js";
import { generateTaskSuggestion } from "../services/aiService.js";

const router = express.Router();

router.post("/suggest", authenticateUser, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const suggestion = await generateTaskSuggestion(description);
    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate task suggestion" });
  }
});

export default router;
