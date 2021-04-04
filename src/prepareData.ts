import { toLeaders } from 'src/slides/leaders';
import { toVote } from 'src/slides/vote';

import { getUsersLikes } from 'src/likes/likes';
import { getUsersCommits } from 'src/commits/commits';
import { getUsers } from 'src/users/users';
import {
  getSortedSprints,
  findCurrentSprint,
  getSprintEntities,
} from 'src/sprints/sprints';

import { Entity, Sprint, User, UserId } from 'src/types/entities';
import { Story } from 'src/types/slides';

function prepareData(entities: Entity[], { id: sprintId }: Sprint): Story[] {
  const sprints: Sprint[] = getSortedSprints(entities);
  const users: Map<UserId, User> = getUsers(entities);
  const currentSprint: Sprint = findCurrentSprint(sprints, sprintId);
  const sprintEntities: Entity[] = getSprintEntities(entities, currentSprint);

  /* 1 */
  const currentSprintUsersCommitsMap: Map<UserId, number> = getUsersCommits(
    sprintEntities
  );

  /* 2 */
  const currentSprintUsersLikesMap: Map<UserId, number> = getUsersLikes(
    sprintEntities
  );

  // First version
  const stories: Story[] = [];
  const leadersSlide: Story = toLeaders(users, currentSprintUsersCommitsMap);
  const voteSlide: Story = toVote(users, currentSprintUsersLikesMap);

  stories.push(leadersSlide);
  stories.push(voteSlide);

  return [];
}

module.exports = { prepareData };
