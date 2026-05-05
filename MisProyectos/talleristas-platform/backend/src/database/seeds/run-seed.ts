import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../../users/user.entity';
import { Provider } from '../../providers/provider.entity';
import { Work } from '../../works/work.entity';
import { WorkPhoto } from '../../works/work-photo.entity';
import { Payment } from '../../payments/payment.entity';
import { Notification } from '../../notifications/notification.entity';
import { Role } from '../../common/roles.enum';

async function waitForDb(retries = 15, delayMs = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await AppDataSource.initialize();
      return;
    } catch (e: any) {
      console.log(`[seed] DB not ready (attempt ${i + 1}/${retries}): ${e.message}`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error('Could not connect to database after multiple attempts');
}

async function run() {
  await waitForDb();
  console.log('[seed] Connected. Seeding...');

  const userRepo = AppDataSource.getRepository(User);
  const providerRepo = AppDataSource.getRepository(Provider);
  const workRepo = AppDataSource.getRepository(Work);
  const photoRepo = AppDataSource.getRepository(WorkPhoto);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const notifRepo = AppDataSource.getRepository(Notification);

  const adminExists = await userRepo.findOne({ where: { email: 'admin@talleristas.local' } });
  if (adminExists) {
    console.log('[seed] Already seeded. Skipping.');
    await AppDataSource.destroy();
    return;
  }

  // Admin
  await userRepo.save(userRepo.create({
    email: 'admin@talleristas.local',
    password: await bcrypt.hash('Admin123!', 10),
    role: Role.ADMIN,
  }));

  // Provider 1
  const u1 = await userRepo.save(userRepo.create({
    email: 'juan@talleristas.local',
    password: await bcrypt.hash('Proveedor123!', 10),
    role: Role.PROVIDER,
  }));
  const p1 = await providerRepo.save(providerRepo.create({
    fullName: 'Juan Pérez',
    trade: 'Carpintero',
    bio: 'Más de 15 años fabricando muebles a medida en madera maciza.',
    phone: '+54 9 11 5555-1111',
    city: 'Buenos Aires',
    user: u1,
  }));

  // Provider 2
  const u2 = await userRepo.save(userRepo.create({
    email: 'maria@talleristas.local',
    password: await bcrypt.hash('Proveedor123!', 10),
    role: Role.PROVIDER,
  }));
  const p2 = await providerRepo.save(providerRepo.create({
    fullName: 'María González',
    trade: 'Tapicera',
    bio: 'Restauración y tapizado de sillones, sillas y butacas.',
    phone: '+54 9 11 5555-2222',
    city: 'Córdoba',
    user: u2,
  }));

  // Works
  const w1 = await workRepo.save(workRepo.create({
    title: 'Mesa de comedor en roble',
    description: 'Mesa para 8 personas, terminación natural con aceite.',
    category: 'Muebles',
    provider: p1,
  }));
  await photoRepo.save([
    photoRepo.create({ url: 'https://picsum.photos/seed/mesa1/800/600', work: w1 }),
    photoRepo.create({ url: 'https://picsum.photos/seed/mesa2/800/600', work: w1 }),
  ]);

  const w2 = await workRepo.save(workRepo.create({
    title: 'Biblioteca a medida',
    description: 'Biblioteca de pared a pared con puertas corredizas.',
    category: 'Muebles',
    provider: p1,
  }));
  await photoRepo.save([
    photoRepo.create({ url: 'https://picsum.photos/seed/biblio/800/600', work: w2 }),
  ]);

  const w3 = await workRepo.save(workRepo.create({
    title: 'Restauración de sillón vintage',
    description: 'Sillón de los años 60 restaurado con tela de lino.',
    category: 'Tapicería',
    provider: p2,
  }));
  await photoRepo.save([
    photoRepo.create({ url: 'https://picsum.photos/seed/sillon1/800/600', work: w3 }),
    photoRepo.create({ url: 'https://picsum.photos/seed/sillon2/800/600', work: w3 }),
  ]);

  // Payments
  await paymentRepo.save([
    paymentRepo.create({ provider: p1, amount: 150000, concept: 'Mesa roble - anticipo', status: 'paid', paidAt: new Date() }),
    paymentRepo.create({ provider: p1, amount: 80000, concept: 'Biblioteca - saldo', status: 'pending' }),
    paymentRepo.create({ provider: p2, amount: 65000, concept: 'Sillón vintage', status: 'paid', paidAt: new Date() }),
  ]);

  // Notifications
  await notifRepo.save([
    notifRepo.create({ provider: p1, title: 'Bienvenido', message: 'Tu cuenta fue activada. Ya podés cargar tus trabajos.' }),
    notifRepo.create({ provider: p1, title: 'Pago pendiente', message: 'Tenés un pago pendiente por la biblioteca.' }),
    notifRepo.create({ provider: p2, title: 'Bienvenida', message: 'Tu cuenta fue activada.' }),
  ]);

  console.log('[seed] Done. Users:');
  console.log('  admin@talleristas.local / Admin123!');
  console.log('  juan@talleristas.local / Proveedor123!');
  console.log('  maria@talleristas.local / Proveedor123!');
  await AppDataSource.destroy();
}

run().catch((err) => {
  console.error('[seed] FAILED:', err);
  process.exit(1);
});
