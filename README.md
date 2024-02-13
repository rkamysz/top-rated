
## Description

During our initial interview, we discussed the importance of separating logic from the framework. In this task, I've chosen to use NestJS as the framework (as was also suggested in the task description), while components not tied to the framework are placed in the "lib" directory. The entire application compiles to the "/build" directory. By default, NestJS sets the source directory as "src". However, I would have preferred to name it "/api". This isn't the only approach; I experimented more with NestJS and this concept.

The main task was to write an endpoint for fetching data from a CSV file, keeping in mind the potential for heavy load and the possibility of integrating other data sources in the future. I'm not entirely sure what these other sources might entail, but I based my code on the repository pattern, and it's within this repository that I maintain the logic responsible for fetching data from the CSV file or from the Redis database cache (if the query has been made previously). There were no specific guidelines regarding how long data should be kept in memory, so I didn't set this. I'm unsure of the overall assumptions, but one could consider clearing Redis every 24 hours and transferring other data to a database like MySQL or MongoDB. I also added throttling to limit the number of requests, assuming we will store cached requests somewhere.

In the code, when initializing dependencies, we provide the URL pattern for the CSV file and the Redis host. If no environment variables are provided, the code has hardcoded default values.

I would like to request that you don't treat this as production-ready. In daily work, executing tasks requires additional information that we would determine during a meeting about this feature and then compose specific tasks.

Pipeline:

request -- (validation) --> NestJS ranking controller --> GetTopRatedRepositoriesUseCase --> RankingRepository (internal logic decides the source) --> redis / CSV file


I also added docker files... I don't know if you also wanted me to add the k8s configuration?

## Installation

```bash
$ yarn
```

## Running the app locally

__If you run it locally make sure to set the localhost for redis in .env__

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app on Docker
```bash
# run
$ docker compose up
# close
$ docker compose down 
```

## Example
```bash
$ curl http://localhost/ranking/TypeScript/2024-01-01?limit=10
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## TODO

- add k8s configs (?)
- add unit tests
- add e2e tests
