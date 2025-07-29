import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { DriverService } from './driver.service';

@Module({
  imports: [RepositoriesModule],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
