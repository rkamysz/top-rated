import { RedisClientType } from 'redis';
import { RankingItemCsvDto } from '../dtos/ranking-item.dto';

export class RankingCacheSource {
  constructor(private client: RedisClientType) {}

  private generateKey(language: string, date: string, limit: number) {
    return `${language}.${date}.${limit}`;
  }

  async get(language: string, date: string, limit: number) {
    const key = this.generateKey(language, date, limit);
    return this.client.get(key);
  }

  async set(
    language: string,
    date: string,
    limit: number,
    records: RankingItemCsvDto[],
  ) {
    const value = JSON.stringify(records);
    return this.client.set(this.generateKey(language, date, limit), value);
  }
}
