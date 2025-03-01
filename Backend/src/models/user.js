import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await db.collection("Users").insertOne({
    name,
    email,
    password: hashedPassword,
  });

  return data.insertedId;
};

export const findUserByEmail = async (email) => {
  return await db.collection("Users").findOne({ email });
};
