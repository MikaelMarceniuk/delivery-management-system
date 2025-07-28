import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { UserRepository } from './user/user.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
