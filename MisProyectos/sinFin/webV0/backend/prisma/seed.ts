import { PrismaClient, CollectionStatus, PricingType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Crear precios
  const monthlyPrice = await prisma.pricing.upsert({
    where: { id: 'price-monthly-001' },
    update: {},
    create: {
      id: 'price-monthly-001',
      type: PricingType.MONTHLY_MAINTENANCE,
      name: 'Mantenimiento Mensual',
      description: 'Cuota mensual para mantener tu perfil activo y visible',
      price: 199.00,
      currency: 'MXN',
      isActive: true,
    },
  });

  const collectionPrice = await prisma.pricing.upsert({
    where: { id: 'price-collection-001' },
    update: {},
    create: {
      id: 'price-collection-001',
      type: PricingType.COLLECTION,
      name: 'Nueva Colección',
      description: 'Pago único por cada nueva colección de fotos',
      price: 99.00,
      currency: 'MXN',
      isActive: true,
    },
  });

  console.log('Pricing created:', { monthlyPrice, collectionPrice });

  // Crear perfiles de talleristas de ejemplo
  // Nota: Los mongoUserIds deben coincidir con los usuarios creados en MongoDB
  const talleristas = [
    {
      id: 'profile-001',
      mongoUserId: 'mongo-tallerista-001',
      businessName: 'Herrería Artesanal García',
      occupation: 'Herrero',
      description: 'Más de 20 años creando piezas únicas en hierro forjado. Especialista en portones, barandales y mobiliario decorativo.',
      phone: '+52 55 1234 5678',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
      featuredImage: '/uploads/placeholder-herrero.jpg',
    },
    {
      id: 'profile-002',
      mongoUserId: 'mongo-tallerista-002',
      businessName: 'Carpintería Fina Rodríguez',
      occupation: 'Carpintero',
      description: 'Muebles de madera maciza hechos a mano. Diseños personalizados para tu hogar con maderas nobles.',
      phone: '+52 33 9876 5432',
      city: 'Guadalajara',
      state: 'Jalisco',
      country: 'México',
      featuredImage: '/uploads/placeholder-carpintero.jpg',
    },
    {
      id: 'profile-003',
      mongoUserId: 'mongo-tallerista-003',
      businessName: 'Cerámica Oaxaqueña Luna',
      occupation: 'Ceramista',
      description: 'Arte en barro negro y policromado. Técnicas ancestrales zapotecas transmitidas por generaciones.',
      phone: '+52 951 555 1234',
      city: 'Oaxaca',
      state: 'Oaxaca',
      country: 'México',
      featuredImage: '/uploads/placeholder-ceramista.jpg',
    },
  ];

  for (const tallerista of talleristas) {
    const profile = await prisma.userProfile.upsert({
      where: { id: tallerista.id },
      update: {},
      create: tallerista,
    });

    // Crear 2 colecciones por tallerista
    const collections = [
      {
        id: `collection-${tallerista.id}-001`,
        userProfileId: profile.id,
        title: 'Trabajos Recientes',
        description: 'Una muestra de mis proyectos más recientes',
        status: CollectionStatus.PUBLISHED,
        isPaid: true,
        isApproved: true,
        publishedAt: new Date(),
      },
      {
        id: `collection-${tallerista.id}-002`,
        userProfileId: profile.id,
        title: 'Proyectos Especiales',
        description: 'Trabajos personalizados y de encargo',
        status: CollectionStatus.PUBLISHED,
        isPaid: true,
        isApproved: true,
        publishedAt: new Date(),
      },
    ];

    for (const collection of collections) {
      await prisma.collection.upsert({
        where: { id: collection.id },
        update: {},
        create: collection,
      });

      // Agregar imágenes de ejemplo
      for (let i = 1; i <= 3; i++) {
        await prisma.collectionImage.upsert({
          where: { id: `image-${collection.id}-${i}` },
          update: {},
          create: {
            id: `image-${collection.id}-${i}`,
            collectionId: collection.id,
            url: `/uploads/placeholder-work-${i}.jpg`,
            originalName: `trabajo-${i}.jpg`,
            mimeType: 'image/jpeg',
            size: 1024000,
            order: i,
          },
        });
      }
    }

    console.log(`Profile and collections created for: ${profile.businessName}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
