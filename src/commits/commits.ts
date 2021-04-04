import { Entity, UserId } from 'src/types/entities';

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
