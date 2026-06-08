import type { NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";
import { collectionService } from "../../../src/services/collectionService";

export default withErrors(withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // admin: list all; provider: only own
    if (["admin","superadmin"].includes(req.user!.role)) return res.json(await collectionService.listAll());
    return res.json(await collectionService.listByProvider(req.user!.providerId!));
  }
  if (req.method === "POST") {
    const body = req.body;
    if (req.user!.role === "provider" && body.providerId !== req.user!.providerId) {
      return res.status(403).json({ message: "Cannot create for another provider" });
    }
    return res.status(201).json(await collectionService.create(body));
  }
  res.status(405).end();
}));
