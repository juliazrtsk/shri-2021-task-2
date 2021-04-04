import { Entity, Sprint, UserId } from 'src/types/entities';

export function getUsersCommits(entities: Entity[]): Map<UserId, number> {
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

export function getCommitsForAllSprints(
  sprints: Sprint[],
  entities: Entity[],
  currentSprintId: number
) {
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
