import { Story, User as SlideUser } from 'src/types/slides';
import { User, UserId } from 'src/types/entities';
import { mapUsersToValuesForSlide } from 'src/users/users';

function transformValue(value: number): string {
  switch (value % 100) {
    case 11:
    case 12:
    case 13:
    case 14:
      return `${value} голосов`;
    default:
      break;
  }
  switch (value % 10) {
    case 1:
      return `${value} голос`;
    case 2:
    case 3:
    case 4:
      return `${value} голоса`;
    default:
      return `${value} голосов`;
  }
}

/* Todo: сделать так, чтобы эта штука возвращала только VoteData? */
export function toVote(
  users: Map<UserId, User>,
  usersLikesMap: Map<UserId, number>
): Story {
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersLikesMap,
    transformValue
  );
  return {
    alias: 'vote',
    data: {
      title: 'Самый 🔎 внимательный разработчик',
      subtitle: 'Последний вагон', // Todo: это нужно брать из текущего спринта
      emoji: '🔎',
      users: slideUsers,
    },
  };
}
