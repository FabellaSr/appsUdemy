import type { NextApiResponse } from "next";
import { withErrors } from "../../../../src/middleware/errors";
import { withAuth, AuthedRequest } from "../../../../src/middleware/auth";
import { paymentService } from "../../../../src/services/paymentService";

export default withErrors(withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).end();
  if (!["admin","superadmin"].includes(req.user!.role)) return res.status(403).json({ message: "Forbidden" });
  res.json(await paymentService.confirm(String(req.query.id)));
}));
