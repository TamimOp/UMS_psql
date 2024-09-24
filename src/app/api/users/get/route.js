import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchUsers = async (req) => {
  const users = await prisma.user.findMany();
  return { data: users, key: "users" };
};

export async function GET(req) {
  return genericMethod(
    req,
    "GET",
    async () => fetchUsers(req),
    "Error fetching users",
    true
  );
}
