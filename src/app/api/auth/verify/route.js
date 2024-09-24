import { genericResponse } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function GET(req) {
  if (req.method !== "GET") {
    return genericResponse(405, "Method not allowed");
  }

  try {
    const cookies = parse(req.headers.get("cookie") || "");

    const token = cookies.authToken;

    if (!token) {
      return genericResponse(
        200,
        { valid: false, decoded: "Token not found" },
        "null"
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return genericResponse(200, { valid: true, decoded }, "null");
  } catch (error) {
    return genericResponse(200, { valid: false, error: error.message }, "null");
  }
}
