import { Container } from 'inversify';
import 'reflect-metadata';
import { GetTopRatedRepositoriesUseCase, RankingRepository } from './domain';
import {
  GitHubRankingCsvService,
  RankingCsvMapper,
  RankingRepositoryImpl,
} from './data';

const container = new Container();

export const configureRankingDependencies = async (container: Container) => {
  const csvContext = {
    mapper: new RankingCsvMapper(),
    service: new GitHubRankingCsvService(
      'https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-[date].csv',
    ),
  };
  const impl = new RankingRepositoryImpl(csvContext);

  container
    .bind<RankingRepository>(RankingRepository.TOKEN)
    .toConstantValue(impl);

  container
    .bind<GetTopRatedRepositoriesUseCase>(GetTopRatedRepositoriesUseCase.TOKEN)
    .to(GetTopRatedRepositoriesUseCase);
};

export { container };
