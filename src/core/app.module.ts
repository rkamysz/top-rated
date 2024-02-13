import { Module } from '@nestjs/common';
import { HealthController } from '../health/health.controller';
import { RankingController } from '../ranking/ranking.controller';
import { GetTopRatedRepositoriesUseCase, container } from 'lib';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: Number(configService.get('THROTTLE_TTL')) || 60000,
          limit: Number(configService.get('THROTTLE_LIMIT')) || 10,
        },
      ],
    }),
  ],
  controllers: [HealthController, RankingController],
  providers: [
    {
      provide: GetTopRatedRepositoriesUseCase.TOKEN,
      useFactory: () =>
        container.get<GetTopRatedRepositoriesUseCase>(
          GetTopRatedRepositoriesUseCase.TOKEN,
        ),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
