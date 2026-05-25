import 'dotenv/config';
import 'reflect-metadata';

import { AppDataSource } from '../data-source';
import { CategoryEntity } from '../../../modules/categories/category.entity';

async function main() {

   
  await AppDataSource.initialize();

  console.log('llega');

  const repo = AppDataSource.getRepository(CategoryEntity);

  const seeds = [
    'Comida',
    'Transporte',
    'Servicios',
    'Salud',
    'Entretenimiento',
  ];

  for (const name of seeds) {
    const exists = await repo.findOneBy({ name });

    if (!exists) {
      await repo.save(repo.create({ name }));
    }
  }

  console.log('SQL seed OK');

  await AppDataSource.destroy();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

 