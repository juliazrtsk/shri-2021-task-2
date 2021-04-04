import { LeadersData, User as SlideUser } from 'src/types/slides';
import { Sprint } from 'src/types/entities';
import { SlideConfigLeaders, SlideDataLeaders } from 'src/types/config';

import { mapUsersToValuesForSlide } from 'src/users/users';

export function toLeaders(
  slideConfig: SlideConfigLeaders,
  slideData: SlideDataLeaders,
  currentSprint: Sprint
): LeadersData {
  const { users, usersCommitsMap } = slideData;
  const { title, emoji, valueText: transformValue } = slideConfig;
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersCommitsMap,
    transformValue
  );
  return {
    title,
    subtitle: currentSprint.name,
    emoji,
    users: slideUsers,
  };
}
