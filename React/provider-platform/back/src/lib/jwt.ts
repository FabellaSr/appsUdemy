import jwt from "jsonwebtoken";
import type { Role } from "../types";

export interface JwtPayload { sub: string; email: string; role: Role; providerId?: string; }

export function signToken(p: JwtPayload) {
  return jwt.sign(p, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}
