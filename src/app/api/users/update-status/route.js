import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUsersStatus = async (req) => {
  const { id, status: sts } = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { status: sts },
  });

  return { data: { success: true, user: updatedUser }, key: "null" };
};

export async function POST(req) {
  return genericMethod(
    req,
    "POST",
    async () => updateUsersStatus(req),
    "Error updating user status",
    true
  );
}
