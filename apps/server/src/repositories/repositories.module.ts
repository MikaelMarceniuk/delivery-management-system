import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { UserRepository } from './user/user.repository';
import { Module } from '@nestjs/common';
import { SessionRepository } from './session/session.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, SessionRepository],
  exports: [UserRepository, SessionRepository],
})
export class RepositoriesModule {}
