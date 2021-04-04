import { Entity, Sprint } from 'src/types/entities';

export function findCurrentSprint(
  entities: Entity[],
  sprintId: number
): Sprint {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (entity.type === 'Sprint' && entity.id === sprintId) {
      return entity as Sprint;
    }
  }
  return null;
}
