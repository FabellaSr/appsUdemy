import mongoose from "mongoose";

let connected = false;
export async function connectMongo() {
  if (connected) return;
  const uri = process.env.MONGO_URI!;
  await mongoose.connect(uri);
  connected = true;
  console.log("[mongo] connected");
}
