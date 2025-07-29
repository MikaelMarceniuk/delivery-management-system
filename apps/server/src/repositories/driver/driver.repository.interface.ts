import { Driver, Prisma } from '@prisma/client';
import { PaginatedDTO } from 'src/http/dto/paginated.dto';

export interface IDriverRepository {
  findMany(
    where: Prisma.DriverWhereInput,
    pagination: PaginatedDTO,
  ): Promise<{ count: number; drivers: Driver[] }>;
}
