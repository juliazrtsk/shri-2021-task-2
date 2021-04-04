import { Entity, Sprint } from './types/entities';
import { StoryData as Slide } from './types/slides';

function findCurrentSprint(entities: Entity[], sprintId: number): Sprint {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.type === 'Sprint' && entity.id === sprintId) {
      return entity as Sprint;
    }
  }
  return null;
}

function prepareData(
  entities: Entity[],
  { sprintId }: { sprintId: number }
): Slide[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentSprint: Sprint = findCurrentSprint(entities, sprintId);
  return [];
}

module.exports = { prepareData, findCurrentSprint };
