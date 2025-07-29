import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  const adminEmail = 'admin@m.com';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('⚠️ Admin user already seeded');
    return;
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash('StrongP@ssword123', salt);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: adminEmail,
      hashedPassword,
    },
  });

  console.log('✅ Seeded admin user');
}
