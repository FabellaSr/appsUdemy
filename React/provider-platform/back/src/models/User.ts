import { Schema, model, models } from "mongoose";
import type { Role } from "../types";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["visitor","provider","admin","superadmin"], default: "provider" },
  providerId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export interface IUser { _id: string; email: string; passwordHash: string; role: Role; providerId?: string | null; }
export const User = (models.User as any) || model("User", UserSchema);
