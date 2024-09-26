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
    const { name, email, password, position } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        position,
        status: "Active",
      },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
    });

    const cookie = createCookie(token);

    return genericResponse(200, user, "user", cookie);
  } catch (error) {
    return genericResponse(
      400,
      "User already exists or another error occurred"
    );
  }
}
