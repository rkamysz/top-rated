import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { RankingParamsDto, RankingQueryParamsDto } from './ranking.dto';
import { GetTopRatedRepositoriesUseCase } from 'lib/ranking/domain/use-cases/get-top-rated-repositories.use-case';

@Controller('ranking')
export class RankingController {
  constructor(
    @Inject(GetTopRatedRepositoriesUseCase.TOKEN)
    private getTopRatedRepositoriesUseCase: GetTopRatedRepositoriesUseCase,
  ) {}

  @Get('/:language/:date')
  getRanking(
    @Param() params: RankingParamsDto,
    @Query() query: RankingQueryParamsDto,
  ) {
    return this.getTopRatedRepositoriesUseCase.execute(
      params.language,
      params.date,
      query.limit,
    );
  }
}
