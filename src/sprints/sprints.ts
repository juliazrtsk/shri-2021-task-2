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

export function doesSprintContainEntity(
  timestamp: number,
  sprint: Sprint
): boolean {
  return (
    !!timestamp && timestamp >= sprint.startAt && timestamp <= sprint.finishAt
  );
}

export function getSprintEntities(
  entities: Entity[],
  sprint: Sprint
): Entity[] {
  return entities.filter(entity => {
    switch (entity.type) {
      case 'Comment':
      case 'Issue':
        return doesSprintContainEntity(entity.createdAt, sprint);
      case 'Commit':
        return doesSprintContainEntity(entity.timestamp, sprint);
      default:
        return false;
    }
  });
}
