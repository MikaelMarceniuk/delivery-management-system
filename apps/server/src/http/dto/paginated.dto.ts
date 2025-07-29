import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginatedDTO {
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  size: number = 10;
}
