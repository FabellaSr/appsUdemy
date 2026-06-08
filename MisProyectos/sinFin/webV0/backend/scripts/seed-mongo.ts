/**
 * Script para crear usuarios de prueba en MongoDB
 * Ejecutar con: npx ts-node scripts/seed-mongo.ts
 */

import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talleristas_auth';

// Schema de usuario (debe coincidir con el del backend)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'tallerista'], default: 'tallerista' },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  lastLogin: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seedUsers() {
  console.log('🌱 Seeding MongoDB users...');

  await mongoose.connect(MONGO_URI);
  console.log('📦 Connected to MongoDB');

  const users = [
    {
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      email: 'admin@talleristas.com',
      password: await bcrypt.hash('Admin123!', 12),
      firstName: 'Admin',
      lastName: 'Sistema',
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    },
    {
      _id: new mongoose.Types.ObjectId('000000000000000000000002'),
      email: 'herrero@demo.com',
      password: await bcrypt.hash('Demo1234!', 12),
      firstName: 'Carlos',
      lastName: 'García',
      role: 'tallerista',
      isActive: true,
      isEmailVerified: true,
    },
    {
      _id: new mongoose.Types.ObjectId('000000000000000000000003'),
      email: 'carpintero@demo.com',
      password: await bcrypt.hash('Demo1234!', 12),
      firstName: 'Miguel',
      lastName: 'Rodríguez',
      role: 'tallerista',
      isActive: true,
      isEmailVerified: true,
    },
    {
      _id: new mongoose.Types.ObjectId('000000000000000000000004'),
      email: 'ceramista@demo.com',
      password: await bcrypt.hash('Demo1234!', 12),
      firstName: 'María',
      lastName: 'Luna',
      role: 'tallerista',
      isActive: true,
      isEmailVerified: true,
    },
  ];

  for (const userData of users) {
    try {
      await User.findOneAndUpdate(
        { email: userData.email },
        userData,
        { upsert: true, new: true }
      );
      console.log(`✓ Usuario creado/actualizado: ${userData.email}`);
    } catch (error) {
      console.error(`✗ Error con ${userData.email}:`, error);
    }
  }

  console.log('\n✅ Seed completado!');
  console.log('\nUsuarios de prueba:');
  console.log('- Admin: admin@talleristas.com / Admin123!');
  console.log('- Herrero: herrero@demo.com / Demo1234!');
  console.log('- Carpintero: carpintero@demo.com / Demo1234!');
  console.log('- Ceramista: ceramista@demo.com / Demo1234!');

  await mongoose.disconnect();
}

seedUsers().catch(console.error);
