import { Entity, User, UserId } from 'src/types/entities';
import { User as SlideUser } from 'src/types/slides';

export function getUsers(entities: Entity[]): Map<UserId, User> {
  return entities.reduce((acc, cur) => {
    if (cur.type !== 'User') return acc;
    acc.set(cur.id, cur);
    return acc;
  }, new Map());
}

export function mapUsersToValuesForSlide(
  users: Map<UserId, User>,
  valuesMap: Map<UserId, number>,
  transformValue: (value: number) => any = value => value
) {
  const mappedUsers: SlideUser[] = [];
  [...valuesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(entry => {
      const [userId, value] = entry;
      const user = users.get(userId);
      const slideUser: SlideUser = {
        id: userId,
        name: user.name,
        avatar: user.avatar,
        valueText: transformValue(value),
      };
      mappedUsers.push(slideUser);
    });
  return mappedUsers;
}
