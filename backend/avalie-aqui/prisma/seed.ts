import { PrismaClient } from '@prisma/client';
import { adminSeeder, productSeeder, userSeeder } from './seeders/index';

const prisma = new PrismaClient();

async function main() {
  userSeeder(prisma, 10);
  adminSeeder(prisma, 5);
  productSeeder(prisma, 20);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
