import { Entity, Sprint, UserId } from 'src/types/entities';

export function getUsersLikesForSprint(
  entities: Entity[],
  sprint: Sprint
): Map<UserId, number> {
  const userLikesMap: Map<UserId, number> = new Map();
  if (!sprint) return userLikesMap;
  entities.reduce((acc, cur) => {
    if (cur.type !== 'Comment') return acc;
    if (cur.createdAt >= sprint.startAt && cur.createdAt <= sprint.finishAt) {
      const authorId =
        typeof cur.author === 'number' ? cur.author : cur.author.id;
      const userLikes: number = acc.get(authorId) || 0;
      acc.set(authorId, userLikes + cur.likes.length);
    }
    return acc;
  }, userLikesMap);
  return userLikesMap;
}
