import type { NextApiResponse } from "next";
import { withAuth, AuthedRequest } from "../../../src/middleware/auth";

export default withAuth(async function (req: AuthedRequest, res: NextApiResponse) {
  res.json({ user: { id: req.user!.sub, email: req.user!.email, role: req.user!.role, providerId: req.user!.providerId } });
});
