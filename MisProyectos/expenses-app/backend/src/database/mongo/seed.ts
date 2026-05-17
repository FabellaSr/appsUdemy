import 'reflect-metadata';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

async function main() {
  const uri = process.env.MONGO_URI ?? 'mongodb://root:rootpass@localhost:27017/expenses_auth?authSource=admin';
  await mongoose.connect(uri);
  const schema = new mongoose.Schema(
    {
      email: { type: String, unique: true },
      name: String,
      passwordHash: String,
      role: { type: String, enum: ['ADMIN', 'MEMBER'], default: 'MEMBER' },
    },
    { timestamps: true, collection: 'auth_users' },
  );
  const Model = mongoose.models.AuthUser || mongoose.model('AuthUser', schema);
  const exists = await Model.findOne({ email: 'admin@demo.com' });
  if (!exists) {
    await Model.create({
      email: 'admin@demo.com',
      name: 'Admin Demo',
      passwordHash: await bcrypt.hash('Admin123!', 10),
      role: 'ADMIN',
    });
     
    console.log('Mongo admin seed OK');
  } else {
     
    console.log('Admin ya existe');
  }
  await mongoose.disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
