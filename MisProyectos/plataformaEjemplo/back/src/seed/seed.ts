import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectMongo } from "../lib/mongo";
import { User } from "../models/User";
import { providerService } from "../services/providerService";

async function main() {
  await connectMongo();

  const providers = [
    { businessName: "Iron Forge Co.", category: "Blacksmith", description: "Custom ironwork, gates and railings.", phone: "+1 555 1001", whatsapp: "+1 555 1001", email: "iron@demo.io", location: "Brooklyn, NY", profileImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600" },
    { businessName: "Wood & Co.", category: "Carpenter", description: "Bespoke furniture and finish carpentry.", phone: "+1 555 1002", whatsapp: "+1 555 1002", email: "wood@demo.io", location: "Austin, TX", profileImage: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600" },
    { businessName: "Bright Sparks", category: "Electrician", description: "Residential & commercial electrical.", phone: "+1 555 1003", whatsapp: "+1 555 1003", email: "spark@demo.io", location: "Chicago, IL", profileImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600" },
  ];
  const created = [];
  for (const p of providers) created.push(await providerService.create(p));

  const users = [
    { email: "superadmin@demo.io", password: "Admin123!", role: "superadmin" },
    { email: "admin@demo.io", password: "Admin123!", role: "admin" },
    { email: "provider@demo.io", password: "Provider123!", role: "provider", providerId: created[0]!.id },
  ];
  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (exists) continue;
    await User.create({ email: u.email, role: u.role, providerId: (u as any).providerId ?? null, passwordHash: await bcrypt.hash(u.password, 10) });
    console.log("Seeded user", u.email);
  }
  console.log("Done.");
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
