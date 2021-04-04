import { Story, User as SlideUser } from 'src/types/slides';
import { User, UserId } from 'src/types/entities';
import { mapUsersToValuesForSlide } from 'src/users/users';

/* Todo: сделать так, чтобы эта штука возвращала только LeadersData? */
export function toLeaders(
  users: Map<UserId, User>,
  usersLikesMap: Map<UserId, number>
): Story {
  const transformValue = (value: number) => `${value}`;
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersLikesMap,
    transformValue
  );
  return {
    alias: 'leaders',
    data: {
      title: 'Больше всего коммитов',
      subtitle: 'Последний вагон', // Todo: это нужно брать из текущего спринта
      emoji: '👑',
      users: slideUsers,
    },
  };
}
