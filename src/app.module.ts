import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { RankingController } from './ranking/ranking.controller';
import { GetTopRatedRepositoriesUseCase, container } from 'lib';

@Module({
  imports: [],
  controllers: [HealthController, RankingController],
  providers: [
    {
      provide: GetTopRatedRepositoriesUseCase.TOKEN,
      useFactory: () =>
        container.get<GetTopRatedRepositoriesUseCase>(
          GetTopRatedRepositoriesUseCase.TOKEN,
        ),
    },
  ],
})
export class AppModule {}
