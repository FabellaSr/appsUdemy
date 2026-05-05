import type { NextApiResponse } from "next";
import { withErrors } from "../../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../../src/middleware/auth";
import { collectionService } from "../../../../src/services/collectionService";

export default withErrors(withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== "PATCH" && req.method !== "PUT") return res.status(405).end();
  const id = String(req.query.id);
  const next = String(req.body.status);
  const allowed = ["active","disabled","pending"];
  if (!allowed.includes(next)) return res.status(400).json({ message: "Invalid status" });

  const current = await collectionService.byId(id);
  if (!current) return res.status(404).json({ message: "Not found" });

  const isAdmin = ["admin","superadmin"].includes(req.user!.role);
  const isOwner = req.user!.providerId === current.providerId;

  // Pending -> active|disabled requires admin
  if (current.status === "pending" && !isAdmin) return res.status(403).json({ message: "Approval requires admin" });
  // Provider can toggle only between active <-> disabled on their own collection
  if (!isAdmin && (!isOwner || (next !== "active" && next !== "disabled"))) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.json(await collectionService.setStatus(id, next as any));
}));
