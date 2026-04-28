import type { NextApiRequest, NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";
import { providerService } from "../../../src/services/providerService";

async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.json(await providerService.list());
  if (req.method === "POST") {
    if (!req.user || !["admin","superadmin"].includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    return res.status(201).json(await providerService.create(req.body));
  }
  res.status(405).end();
}

export default withErrors((req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return handler(req as any, res); // public list
  return withAuth(handler as any)(req as any, res);
});
