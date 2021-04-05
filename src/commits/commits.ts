import moment from 'moment';

import {
  Commit,
  Entity,
  Sprint,
  Summary,
  SummaryId,
  UserId,
} from 'src/types/entities';
import { ChartCommit } from 'src/types/slides';
import { CommitCategory, WeekDay } from 'src/types/config';

export function getUsersCommitsMap(entities: Entity[]): Map<UserId, number> {
  const usersCommitsMap: Map<UserId, number> = new Map();
  if (!entities) return usersCommitsMap;
  entities.reduce((acc, cur) => {
    if (cur.type !== 'Commit') return acc;
    const authorId =
      typeof cur.author === 'number' ? cur.author : cur.author.id;
    const userCommits: number = acc.get(authorId) || 0;
    acc.set(authorId, userCommits + 1);
    return acc;
  }, usersCommitsMap);
  return usersCommitsMap;
}

export function getCommitsCountForAllSprints(
  sprints: Sprint[],
  entities: Entity[],
  currentSprintId: number
): ChartCommit[] {
  return sprints.map(sprint => {
    const commits = entities.reduce((acc, cur) => {
      if (
        cur.type !== 'Commit' ||
        cur.timestamp < sprint.startAt ||
        cur.timestamp > sprint.finishAt
      ) {
        return acc;
      }
      return acc + 1;
    }, 0);
    const result = { title: `${sprint.id}`, hint: sprint.name, value: commits };
    if (sprint.id === currentSprintId) {
      return { ...result, active: true };
    }
    return result;
  });
}

export function getCommitCategory(commitSize: number): CommitCategory {
  if (commitSize >= 1000) return 'extra';
  if (commitSize >= 501 && commitSize <= 1000) return 'max';
  if (commitSize >= 101 && commitSize <= 500) return 'mid';
  return 'min';
}

export function getCommitsList(entities: Entity[]): Commit[] {
  return entities.filter(
    (entity: Entity) => entity.type === 'Commit'
  ) as Commit[];
}

export function getSprintCommitsStatistics(
  commits: Commit[],
  summaries: Map<SummaryId, Summary>
): Map<CommitCategory, number> {
  return commits.reduce(
    (categoriesMap: Map<CommitCategory, number>, commit: Commit) => {
      const commitSize: number = commit.summaries.reduce(
        (size: number, relatedSummary: Summary | SummaryId) => {
          const summary =
            typeof relatedSummary === 'number'
              ? summaries.get(relatedSummary)
              : relatedSummary;
          return size + summary.added + summary.removed;
        },
        0
      ) as number;
      const category = getCommitCategory(commitSize);
      categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
      return categoriesMap;
    },
    new Map()
  );
}

export function getSprintCommitStatisticsTotal(
  stats: Map<CommitCategory, number>
) {
  return [...stats.entries()].reduce(
    (sum, categoryPair) => sum + categoryPair[1],
    0
  );
}

export function getDailyCommitsStatistics(
  commits: Commit[]
): Map<WeekDay, number[]> {
  const dayStatTemplate = new Array(24).fill(0);
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  return commits.reduce((commitsPerHour, commit) => {
    const date = moment(commit.timestamp).utcOffset(180);
    const weekDay = weekDays[date.weekday()];
    const dayStat = commitsPerHour.get(weekDay) || [...dayStatTemplate];
    dayStat[date.hour()] += 1;
    commitsPerHour.set(weekDay, dayStat);
    return commitsPerHour;
  }, new Map());
}
