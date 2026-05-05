import type { NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";
import { paymentService } from "../../../src/services/paymentService";

export default withErrors(withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const isAdmin = ["admin","superadmin"].includes(req.user!.role);
    const providerId = isAdmin ? (req.query.providerId as string | undefined) : req.user!.providerId;
    return res.json(await paymentService.list(providerId));
  }
  if (req.method === "POST") {
    const body = req.body;
    if (req.user!.role === "provider" && body.providerId !== req.user!.providerId) {
      return res.status(403).json({ message: "Cannot notify for another provider" });
    }
    return res.status(201).json(await paymentService.create(body));
  }
  res.status(405).end();
}));
