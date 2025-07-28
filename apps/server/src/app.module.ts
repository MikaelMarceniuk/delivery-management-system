import { Module } from '@nestjs/common';
import { UserModule } from './http/user/user.module';
import { AuthModule } from './http/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
