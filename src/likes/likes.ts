import { Entity, UserId } from 'src/types/entities';

export function getUsersLikes(entities: Entity[]): Map<UserId, number> {
  const userLikesMap: Map<UserId, number> = new Map();
  if (!entities) return userLikesMap;
  entities.reduce((acc, cur) => {
    if (cur.type !== 'Comment') return acc;
    const authorId =
      typeof cur.author === 'number' ? cur.author : cur.author.id;
    const userLikes: number = acc.get(authorId) || 0;
    acc.set(authorId, userLikes + cur.likes.length);
    return acc;
  }, userLikesMap);
  return userLikesMap;
}
