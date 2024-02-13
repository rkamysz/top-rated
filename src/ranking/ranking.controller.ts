import { Controller, Get, Param, Query } from '@nestjs/common';
import { RankingParamsDto, RankingQueryParamsDto } from './ranking.dto';

@Controller('ranking')
export class RankingController {
  @Get('/:language/:date')
  getRanking(
    @Param() params: RankingParamsDto,
    @Query() query: RankingQueryParamsDto,
  ) {
    return {
      language: params.language,
      date: params.date,
      limit: query.limit,
    };
  }
}
