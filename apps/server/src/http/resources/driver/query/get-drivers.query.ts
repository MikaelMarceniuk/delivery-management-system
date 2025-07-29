import { IsString } from 'class-validator';
import { PaginatedDTO } from 'src/http/dto/paginated.dto';

export class GetDriversQuery extends PaginatedDTO {
  @IsString()
  name?: string;
}
