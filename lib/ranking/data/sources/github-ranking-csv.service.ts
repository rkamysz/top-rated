/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { parse } from 'csv-parse';
import { RankingItemCsvDto } from '../dtos/ranking-item.dto';

export class GitHubRankingCsvService {
  constructor(private urlPattern: string) {
    if (urlPattern.includes('[date]') === false) {
      throw new Error('Missing "[date]" in pattern');
    }
  }

  public async fetch(
    language: string,
    date: string,
    limit?: number,
  ): Promise<RankingItemCsvDto[]> {
    const url = this.urlPattern.replace('[date]', date);
    const languageLC = language.toLowerCase();

    return new Promise(async (resolve, reject) => {
      const list: RankingItemCsvDto[] = [];
      let recordCount = 0;

      try {
        const response = await axios({
          method: 'get',
          url: url,
          responseType: 'stream',
        });

        const parser = response.data.pipe(
          parse({
            columns: true,
            delimiter: ',',
          }),
        );

        parser.on('readable', function () {
          let record: RankingItemCsvDto;
          while ((record = parser.read()) !== null) {
            if (record.language.toLowerCase() === languageLC) {
              list.push(record);
              recordCount += 1;

              if (limit && list.length === limit) {
                resolve(list);
                parser.destroy();
                return;
              }
            }
          }
        });

        parser.on('error', function (err) {
          console.error(err.message);
          reject(err);
        });

        parser.on('end', function () {
          console.log('CSV parsing completed.');
          resolve(list);
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
        reject(error);
      }
    });
  }
}
