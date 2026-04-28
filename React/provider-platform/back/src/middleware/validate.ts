import type { NextApiRequest, NextApiResponse } from "next";
import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>, source: "body" | "query" = "body") {
  return (handler: (req: NextApiRequest, res: NextApiResponse) => any) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
      const parsed = schema.safeParse(req[source]);
      if (!parsed.success) return res.status(400).json({ message: "Validation error", issues: parsed.error.issues });
      (req as any)[source] = parsed.data;
      return handler(req, res);
    };
}
