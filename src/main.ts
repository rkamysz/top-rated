import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureRankingDependencies, container } from 'lib';
import { ThrottlerExceptionFilter } from './core/filters/throttler-exception.filter';

async function bootstrap() {
  await configureRankingDependencies(container);

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
