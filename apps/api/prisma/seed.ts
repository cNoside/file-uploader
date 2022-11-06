import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const USERS_AMOUNT = 10;
const PRODUCTS_AMOUNT = 10;

async function main() {
  const rootUser = await prisma.user.create({
    data: {
      username: 'root',
      email: 'root@internal.com',
      password: await argon2.hash('1q!Q1q!Q'),
      role: 'ADMIN'
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
