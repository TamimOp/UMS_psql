// /pages/api/auth/register.js
import { hash } from "bcryptjs";
import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, position, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password and store the new user in the database
      const hashedPassword = await hash(password, 10);
      await query(
        `INSERT INTO users (name, position, email, password) VALUES ($1, $2, $3, $4)`,
        [name, position, email, hashedPassword]
      );

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
