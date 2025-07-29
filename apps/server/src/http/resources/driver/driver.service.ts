import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DriverRepository } from 'src/repositories/driver/driver.repository';
import { GetDriversQuery } from './query/get-drivers.query';
import { Prisma } from '@prisma/client';
import { DriverPaginatedPresenter } from './presenters/driver.paginated.presenter';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async getDrivers(query: GetDriversQuery) {
    try {
      const { size, page, ...filters } = query;
      const where: Prisma.DriverWhereInput = {
        name: filters.name
          ? {
              contains: filters.name,
            }
          : undefined,
      };

      const { count, drivers } = await this.driverRepository.findMany(where, {
        size,
        page,
      });

      return new DriverPaginatedPresenter({
        total: count,
        page,
        size,
        drivers,
      });
    } catch (err) {
      console.log('getDrivers.err: ', err);
      throw new InternalServerErrorException();
    }
  }
}
