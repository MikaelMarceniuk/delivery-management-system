import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SessionTokenGuard } from 'src/http/guards/session-token.guard';
import { DriverService } from './driver.service';
import { GetDriversQuery } from './query/get-drivers.query';

@UseGuards(SessionTokenGuard)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getDrivers(@Query() query: GetDriversQuery) {
    return await this.driverService.getDrivers(query);
  }
}
