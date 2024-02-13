import { IsDateString, IsNotEmpty } from 'class-validator';

export class RankingParamsDto {
  @IsNotEmpty()
  language: string;

  @IsDateString()
  date: string;
}

import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class RankingQueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 0;
}
