import { getUsersLikesForSprint } from 'src/likes/likes';
import { findCurrentSprint } from 'src/sprints/sprints';

import { Entity, Sprint, UserId } from './types/entities';
import { StoryData as Slide } from './types/slides';

function prepareData(entities: Entity[], { id: sprintId }: Sprint): Slide[] {
  const currentSprint: Sprint = findCurrentSprint(entities, sprintId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userLikes: Map<UserId, number> = getUsersLikesForSprint(
    entities,
    currentSprint
  );

  return [];
}

module.exports = { prepareData };
