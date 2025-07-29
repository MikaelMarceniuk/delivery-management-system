import { Module } from '@nestjs/common';
import { UserModule } from './http/resources/user/user.module';
import { AuthModule } from './http/resources/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
