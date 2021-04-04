import { toLeaders } from 'src/slides/leaders';
import { toVote } from 'src/slides/vote';
import { toChart } from 'src/slides/chart';

import { getUsersLikes } from 'src/likes/likes';
import { getCommitsForAllSprints, getUsersCommits } from 'src/commits/commits';
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

  /* 3 */
  const sprintsCommits = getCommitsForAllSprints(
    sprints,
    entities,
    currentSprint.id
  );

  // First version
  const stories: Story[] = [];
  const leadersSlide: Story = toLeaders(users, currentSprintUsersCommitsMap);
  const voteSlide: Story = toVote(users, currentSprintUsersLikesMap);
  const chartSlide: Story = toChart(
    sprintsCommits,
    users,
    currentSprintUsersCommitsMap
  );
  stories.push(leadersSlide);
  stories.push(voteSlide);
  stories.push(chartSlide);

  return [];
}

module.exports = { prepareData };
