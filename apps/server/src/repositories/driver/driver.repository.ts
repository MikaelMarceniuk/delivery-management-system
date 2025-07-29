import { Driver, Prisma } from '@prisma/client';
import { IDriverRepository } from './driver.repository.interface';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from 'src/http/dto/paginated.dto';

@Injectable()
export class DriverRepository implements IDriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    where: Prisma.DriverWhereInput,
    pagination: PaginatedDTO,
  ): Promise<{ count: number; drivers: Driver[] }> {
    const driverPromise = this.prisma.driver.findMany({
      where,
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
    });

    const driverCount = this.prisma.driver.count({
      where,
    });

    const [count, drivers] = await Promise.all([driverCount, driverPromise]);

    return {
      count,
      drivers,
    };
  }
}
