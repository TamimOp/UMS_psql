import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export function verifyToken(req) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");

    const token = cookies.authToken;

    if (!token) {
      return { valid: false, decoded: "Token not found" };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return { valid: true, decoded };
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return { valid: false, error: error.message };
  }
}
