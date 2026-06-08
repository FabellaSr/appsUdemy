import type { NextApiRequest, NextApiResponse } from "next";
import { log } from "../lib/logger";

export function withErrors(handler: (req: NextApiRequest, res: NextApiResponse) => any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (err: any) {
      log.error(err);
      const status = err.status || 500;
      res.status(status).json({ message: err.message || "Internal error" });
    }
  };
}
