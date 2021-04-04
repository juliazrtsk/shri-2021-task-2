import { getUsersLikes } from 'src/likes/likes';
import {
  getSortedSprints,
  findCurrentSprint,
  getSprintEntities,
} from 'src/sprints/sprints';
import { getUsersCommits } from './commits/commits';

import { Entity, Sprint, UserId } from './types/entities';
import { StoryData as Slide } from './types/slides';

function prepareData(entities: Entity[], { id: sprintId }: Sprint): Slide[] {
  const sprints: Sprint[] = getSortedSprints(entities);
  const currentSprint: Sprint = findCurrentSprint(sprints, sprintId);
  const sprintEntities: Entity[] = getSprintEntities(entities, currentSprint);

  /* 1 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLikes: Map<UserId, number> = getUsersLikes(sprintEntities);

  /* 2 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userCommits: Map<UserId, number> = getUsersCommits(sprintEntities);
  return [];
}

module.exports = { prepareData };
