import { Result } from 'lib/core';
import { RankingItem, RankingRepository } from 'lib/ranking/domain';
import { GitHubRankingCsvService } from '../sources/github-ranking-csv.service';
import { RankingCsvMapper } from '../mappers/ranking-csv.mapper';

type CsvContext = {
  service: GitHubRankingCsvService;
  mapper: RankingCsvMapper;
};

export class RankingRepositoryImpl implements RankingRepository {
  constructor(private csvContext: CsvContext) {}

  async getTopRatedRepositories(
    language: string,
    date: string,
    limit?: number,
  ): Promise<Result<RankingItem[], Error>> {
    const { csvContext } = this;
    try {
      const records = await csvContext.service.fetch(language, date, limit);

      return Result.withContent(
        records.map((dto) => csvContext.mapper.toEntity(dto)),
      );
    } catch (error) {
      return Result.withFailure(error);
    }
  }
}
