import type { NextApiRequest, NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";
import { providerService } from "../../../src/services/providerService";

async function handler(req: AuthedRequest, res: NextApiResponse) {
  const id = String(req.query.id);
  if (req.method === "GET") {
    const p = await providerService.byId(id);
    if (!p) return res.status(404).json({ message: "Not found" });
    return res.json(p);
  }
  if (req.method === "PUT") {
    if (!req.user) return res.status(401).end();
    const isOwner = req.user.providerId === id;
    const isAdmin = ["admin","superadmin"].includes(req.user.role);
    if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden" });
    return res.json(await providerService.update(id, req.body));
  }
  res.status(405).end();
}

export default withErrors((req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return handler(req as any, res);
  return withAuth(handler as any)(req as any, res);
});
