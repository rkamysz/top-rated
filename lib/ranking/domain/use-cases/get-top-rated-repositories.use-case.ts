/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'inversify';
import { RankingRepository } from '../repositories/ranking.repository';

@injectable()
export class GetTopRatedRepositoriesUseCase {
  public static TOKEN = 'GetTopRatedRepositoriesUseCase';

  constructor(
    @inject(RankingRepository.TOKEN)
    private rankingRepository: RankingRepository,
  ) {}

  async execute(language: string, date: string, limit: number) {
    const result = await this.rankingRepository.getTopRatedRepositories(
      language,
      date,
      limit,
    );

    return result.content;
  }
}
