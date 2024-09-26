import { createCookie } from "@/utils/api/cookies";
import { generateToken } from "@/utils/api/jwt";
import { genericResponse } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method !== "POST") {
    return genericResponse(405, "Method not allowed");
  }

  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return genericResponse(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return genericResponse(401, "Invalid password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
    });
    const cookie = createCookie(token);

    await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });

    return genericResponse(200, "Login successful", "message", cookie);
  } catch (error) {
    return genericResponse(500, "Something went wrong");
  }
}
