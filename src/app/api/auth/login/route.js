import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const { email, password } = await req.json();

    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Serialize the cookie with the token
    const cookie = serialize("authToken", token, {
      httpOnly: true, // Secure: prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 60 * 60, // 1 hour
      path: "/", // Root path for the cookie
    });

    // Return the response with the cookie header
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie, // Send the cookie in the response
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
