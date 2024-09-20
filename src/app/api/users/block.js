// pages/api/users/block.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { userIds } = req.body; // Receive the user IDs to block
    try {
      await prisma.user.updateMany({
        where: { id: { in: userIds } },
        data: { status: "Blocked" },
      });
      res.status(200).json({ message: "Users blocked successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error blocking users" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
