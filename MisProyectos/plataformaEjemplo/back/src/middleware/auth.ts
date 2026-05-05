import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken, JwtPayload } from "../lib/jwt";

export interface AuthedRequest extends NextApiRequest { user?: JwtPayload; }

export function withAuth(handler: (req: AuthedRequest, res: NextApiResponse) => any, opts: { optional?: boolean } = {}) {
  return async (req: AuthedRequest, res: NextApiResponse) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      if (opts.optional) return handler(req, res);
      return res.status(401).json({ message: "Missing token" });
    }
    try {
      req.user = verifyToken(header.slice(7));
      return handler(req, res);
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
