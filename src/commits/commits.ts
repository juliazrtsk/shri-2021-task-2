import { Entity, Sprint, UserId } from 'src/types/entities';

export function getUsersCommitsForSprint(
  entities: Entity[],
  sprint: Sprint
): Map<UserId, number> {
  const usersCommitsMap: Map<UserId, number> = new Map();
  if (!sprint || !entities) return usersCommitsMap;
  entities.reduce((acc, cur) => {
    if (cur.type !== 'Commit') return acc;
    if (cur.timestamp >= sprint.startAt && cur.timestamp <= sprint.finishAt) {
      const authorId =
        typeof cur.author === 'number' ? cur.author : cur.author.id;
      const userCommits: number = acc.get(authorId) || 0;
      acc.set(authorId, userCommits + 1);
    }
    return acc;
  }, usersCommitsMap);
  return usersCommitsMap;
}
