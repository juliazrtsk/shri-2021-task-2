import { mapUsersToValuesForSlide } from 'src/users/users';

import { Story, User as SlideUser } from 'src/types/slides';
import { User, UserId } from 'src/types/entities';

export function toChart(
  sprintsCommits: any[],
  users: Map<UserId, User>,
  usersLikesMap: Map<UserId, number>
): Story {
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersLikesMap
  );
  return {
    alias: 'chart',
    data: {
      title: 'Коммиты',
      subtitle: 'Последний вагон', // Todo: это нужно брать из текущего спринта
      values: sprintsCommits,
      users: slideUsers,
    },
  };
}
