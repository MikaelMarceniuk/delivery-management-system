import { PrismaClient } from '@prisma/client';
import { seedDrivers } from './drivers.seed';
import { seedUsers } from './user.seed';

async function main() {
  try {
    const prisma = new PrismaClient();
    console.log('🔁 Iniciando seeds...');

    await seedUsers(prisma);
    await seedDrivers(prisma);

    console.log('🎉 Todos os seeds executados com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao executar seeds:', err);
    process.exit(1);
  }
}

main();
