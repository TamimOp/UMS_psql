// File: /pages/api/auth/login.js

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const user = await query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await compare(password, user[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
