export class RankingItem {
  constructor(
    public readonly rank: number,
    public readonly item: string,
    public readonly language: string,
    public readonly repository: string,
    public readonly stars: number,
    public readonly forks: number,
    public readonly issues: number,
    public readonly lastCommit: Date,
    public readonly url: string,
    public readonly username: string,
    public readonly description: string,
  ) {}
}
