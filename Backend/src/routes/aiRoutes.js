import express from "express";
import { authenticateUser } from "../middleWare/authMiddleware.js";
import {
  generateTaskAnalysis,
  generateTaskSuggestion,
  generateTaskTemplates,
  generateWorkflowSuggestion,
} from "../services/aiService.js";

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

router.post("/task-analysis", authenticateUser, async (req, res) => {
  try {
    const analysis = await generateTaskAnalysis();
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate task analysis" });
  }
});

router.post("/task-templates", authenticateUser, async (req, res) => {
  try {
    const templates = await generateTaskTemplates();
    res.json({ templates });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate task templates" });
  }
});

router.post("/workflow-improvement", authenticateUser, async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    const suggestion = await generateWorkflowSuggestion(input);
    res.json({ suggestion });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate workflow improvement suggestion" });
  }
});

export default router;
