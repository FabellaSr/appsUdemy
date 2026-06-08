import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Stateless JWT; client deletes token. Endpoint exists for symmetry/auditing.
  res.json({ ok: true });
}
