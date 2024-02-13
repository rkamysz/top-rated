import { RankingItem } from 'lib/ranking/domain';
import { RankingItemCsvDto } from '../dtos/ranking-item.dto';

export class RankingCsvMapper {
  fromEntity(entity: RankingItem): RankingItemCsvDto {
    const {
      rank,
      item,
      language,
      repository,
      stars,
      forks,
      issues,
      lastCommit,
      url,
      username,
      description,
    } = entity;

    return {
      rank,
      item,
      language,
      repo_name: repository,
      stars,
      forks,
      issues,
      last_commit: lastCommit.toISOString(),
      repo_url: url,
      username,
      description,
    };
  }
  toEntity(dto: RankingItemCsvDto): RankingItem {
    const {
      rank,
      item,
      repo_name,
      stars,
      forks,
      language,
      repo_url,
      username,
      issues,
      last_commit,
      description,
    } = dto;
    return new RankingItem(
      rank,
      item,
      language,
      repo_name,
      stars,
      forks,
      issues,
      new Date(last_commit),
      repo_url,
      username,
      description,
    );
  }
}
