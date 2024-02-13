import { Container } from 'inversify';
import 'reflect-metadata';
import redis, { RedisClientType } from 'redis';
import { GetTopRatedRepositoriesUseCase, RankingRepository } from './domain';
import {
  GitHubRankingCsvService,
  RankingCacheSource,
  RankingCsvMapper,
  RankingRedisMapper,
  RankingRepositoryImpl,
} from './data';

const container = new Container();

type Options = {
  csv_url_pattern: string;
  redis_host: string;
};

export const configureRankingDependencies = async (
  container: Container,
  options: Options,
) => {
  const csvContext = {
    mapper: new RankingCsvMapper(),
    service: new GitHubRankingCsvService(options.csv_url_pattern),
  };

  const redisClient: RedisClientType = await redis.createClient({
    url: options.redis_host,
  });
  await redisClient.connect();

  const redisContext = {
    mapper: new RankingRedisMapper(),
    service: new RankingCacheSource(redisClient),
  };

  const impl = new RankingRepositoryImpl(csvContext, redisContext);

  container
    .bind<RankingRepository>(RankingRepository.TOKEN)
    .toConstantValue(impl);

  container
    .bind<GetTopRatedRepositoriesUseCase>(GetTopRatedRepositoriesUseCase.TOKEN)
    .to(GetTopRatedRepositoriesUseCase);
};

export { container };
