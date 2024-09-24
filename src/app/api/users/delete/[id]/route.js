import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (uid) => {
  const id = Number(uid);

  await prisma.user.delete({
    where: { id },
  });

  return "Users deleted successfully";
};

export async function DELETE(req, params) {
  return genericMethod(
    req,
    "DELETE",
    async () => deleteUser(params.params.id),
    "Error deleting users",
    true
  );
}
