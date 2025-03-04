import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/user.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

router.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.error("❌ Email already in use:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const userId = await createUser(name, email, password);

    if (!userId) {
      console.error("❌ Failed to create user in database");
      return res.status(500).json({ message: "User creation failed" });
    }

    const token = jwt.sign({ userId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Registration Successful:", { userId, token });

    res.json({
      message: "User registered successfully",
      userId,
      token,
    });
  } catch (error) {
    console.error("🚨 Registration Error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
