import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureRankingDependencies, container } from 'lib';
import { ThrottlerExceptionFilter } from './core/filters/throttler-exception.filter';

async function bootstrap() {
  await configureRankingDependencies(container, {
    redis_host: process.env['REDIS_HOST'] || 'redis://localhost:6379',
    csv_url_pattern:
      process.env['CSV_URL_PATTERN'] ||
      'https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-[date].csv',
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ThrottlerExceptionFilter());
  await app.listen(3000);
}
bootstrap();
