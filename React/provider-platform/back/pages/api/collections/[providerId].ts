import type { NextApiRequest, NextApiResponse } from "next";
import { withErrors } from "../../../src/middleware/errors";
import { collectionService } from "../../../src/services/collectionService";

// Public: list collections of a provider (only active for visitors handled in front).
export default withErrors(async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const providerId = String(req.query.providerId);
  res.json(await collectionService.listByProvider(providerId));
});
