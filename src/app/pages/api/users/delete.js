// pages/api/users/delete.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { userIds } = req.body; // Receive the user IDs to delete
    try {
      await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { status: "Deleted" },
      });
      res.status(200).json({ message: "Users deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting users" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
