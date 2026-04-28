import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectMongo } from "../../../src/lib/mongo";
import { User } from "../../../src/models/User";
import { signToken } from "../../../src/lib/jwt";
import { withErrors } from "../../../src/middleware/errors";
import { logAction } from "../../../src/services/logService";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default withErrors(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });
  await connectMongo();
  const u = await User.findOne({ email: parsed.data.email });
  if (!u) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(parsed.data.password, u.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken({ sub: String(u._id), email: u.email, role: u.role, providerId: u.providerId ?? undefined });
  await logAction(String(u._id), "auth.login");
  res.json({ token, user: { id: String(u._id), email: u.email, role: u.role, providerId: u.providerId ?? undefined } });
});
