import { Module } from '@nestjs/common';
import { UserModule } from './http/resources/user/user.module';
import { AuthModule } from './http/resources/auth/auth.module';
import { DriverModule } from './http/resources/driver/driver.module';

@Module({
  imports: [UserModule, AuthModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
