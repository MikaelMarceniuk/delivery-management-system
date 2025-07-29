import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { UserRepository } from './user/user.repository';
import { Module } from '@nestjs/common';
import { SessionRepository } from './session/session.repository';
import { DriverRepository } from './driver/driver.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, SessionRepository, DriverRepository],
  exports: [UserRepository, SessionRepository, DriverRepository],
})
export class RepositoriesModule {}
