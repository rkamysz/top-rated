import { Result } from 'lib/core';
import { RankingItem } from '../entities/ranking-item';
import { injectable } from 'inversify';

@injectable()
export abstract class RankingRepository {
  public static TOKEN = 'RankingRepository';

  abstract getTopRatedRepositories(
    language: string,
    date: string,
    limit?: number,
  ): Promise<Result<RankingItem[], Error>>;
}
