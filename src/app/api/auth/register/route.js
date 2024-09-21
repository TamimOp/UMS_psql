import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
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

    console.log(user);

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: "User already exists or another error occurred",
      }),
      {
        status: 400,
      }
    );
  }
}
