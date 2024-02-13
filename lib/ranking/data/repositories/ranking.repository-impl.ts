import { Result } from 'lib/core';
import { RankingItem, RankingRepository } from 'lib/ranking/domain';
import { GitHubRankingCsvService } from '../sources/github-ranking-csv.service';
import { RankingCsvMapper } from '../mappers/ranking-csv.mapper';
import { RankingCacheSource } from '../sources/redis-cache.source';
import { RankingRedisMapper } from '../mappers/ranking-redis.mapper';

type CsvContext = {
  service: GitHubRankingCsvService;
  mapper: RankingCsvMapper;
};

type RedisContext = {
  service: RankingCacheSource;
  mapper: RankingRedisMapper;
};

export class RankingRepositoryImpl implements RankingRepository {
  constructor(
    private csvContext: CsvContext,
    private redisContext: RedisContext,
  ) {}

  async getTopRatedRepositories(
    language: string,
    date: string,
    limit?: number,
  ): Promise<Result<RankingItem[], Error>> {
    const { csvContext, redisContext } = this;
    try {
      const cachedStr = await redisContext.service.get(language, date, limit);

      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        if (Array.isArray(cached)) {
          return Result.withContent(
            cached.map((dto) => redisContext.mapper.toEntity(dto)),
          );
        } else {
          return Result.withFailure('Cached result is not array');
        }
      } else {
        const records = await csvContext.service.fetch(language, date, limit);
        await redisContext.service.set(language, date, limit, records);

        return Result.withContent(
          records.map((dto) => csvContext.mapper.toEntity(dto)),
        );
      }
    } catch (error) {
      return Result.withFailure(error);
    }
  }
}
