import type { NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";
import { notificationService } from "../../../src/services/notificationService";

export default withErrors(withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const isAdmin = ["admin","superadmin"].includes(req.user!.role);
    if (req.query.all === "1" && isAdmin) return res.json(notificationService.list());
    return res.json(notificationService.list(req.user!.providerId));
  }
  if (req.method === "POST") {
    if (!["admin","superadmin"].includes(req.user!.role)) return res.status(403).json({ message: "Forbidden" });
    return res.status(201).json(notificationService.create(req.body));
  }
  res.status(405).end();
}));
