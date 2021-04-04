import { User as SlideUser, VoteData } from 'src/types/slides';
import { Sprint } from 'src/types/entities';
import { SlideConfigVote, SlideDataVote } from 'src/types/config';

import { mapUsersToValuesForSlide } from 'src/users/users';

export function toVote(
  slideConfig: SlideConfigVote,
  slideData: SlideDataVote,
  currentSprint: Sprint
): VoteData {
  const { users, usersLikesMap } = slideData;
  const { title, emoji, valueText: transformValue } = slideConfig;
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersLikesMap,
    transformValue
  );
  return {
    title,
    subtitle: currentSprint.name,
    emoji,
    users: slideUsers,
  };
}
