import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema({
  userId: { type: String, required: true, index: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 },
});
export const Session = (models.Session as any) || model("Session", SessionSchema);
