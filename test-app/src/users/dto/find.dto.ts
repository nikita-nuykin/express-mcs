import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class FindUsersRequestQuery {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  page!: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  limit!: number;
}
