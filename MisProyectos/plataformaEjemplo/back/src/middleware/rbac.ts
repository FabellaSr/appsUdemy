import type { NextApiResponse } from "next";
import type { AuthedRequest } from "./auth";
import type { Role } from "../types";

export function requireRoles(...roles: Role[]) {
  return (handler: (req: AuthedRequest, res: NextApiResponse) => any) =>
    async (req: AuthedRequest, res: NextApiResponse) => {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
      return handler(req, res);
    };
}
