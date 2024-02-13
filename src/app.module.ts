import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { RankingController } from './ranking/ranking.controller';

@Module({
  imports: [],
  controllers: [HealthController, RankingController],
  providers: [],
})
export class AppModule {}
