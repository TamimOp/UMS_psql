// pages/api/users/unblock.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { userIds } = req.body; // Receive the user IDs to unblock
    try {
      await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { status: "Active" },
      });
      res.status(200).json({ message: "Users unblocked successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error unblocking users" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
