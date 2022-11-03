import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const USERS_AMOUNT = 10;
const PRODUCTS_AMOUNT = 10;

async function main() {
  const rootUser = await prisma.user.create({
    data: {
      username: 'root',
      email: 'root@internal.com',
      password: 'root'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
