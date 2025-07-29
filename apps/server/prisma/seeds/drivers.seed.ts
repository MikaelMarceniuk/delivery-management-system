import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { genSalt, hash } from 'bcrypt';

export async function seedDrivers(prisma: PrismaClient) {
  const driversCount = await prisma.driver.count();
  if (driversCount >= 50) {
    console.log('⚠️ Drivers already seeded.');
    return;
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash('12345678', salt);
  const cnhOptions = ['A', 'B', 'C', 'D', 'E'] as const;

  const driverPromises = Array.from({ length: 50 }).map(() =>
    prisma.driver.create({
      data: {
        name: faker.person.fullName(),
        phone: `169${faker.string.numeric(8)}`,
        cnhCategory: faker.helpers.arrayElements(cnhOptions, {
          min: 1,
          max: cnhOptions.length,
        }),
        user: {
          create: {
            name: faker.person.fullName(),
            email: faker.internet
              .email({ allowSpecialCharacters: false })
              .toLowerCase(),
            hashedPassword,
          },
        },
      },
    }),
  );

  await Promise.all(driverPromises);
  console.log('✅ Seeded 50 drivers');
}
