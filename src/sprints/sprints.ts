import { Entity, Sprint, SprintId } from 'src/types/entities';

function sprintComparator(first: Sprint, second: Sprint) {
  return first.id > second.id ? 1 : -1;
}

/**
 * Get all sprints sorted in asc order
 * @param entities - Entity array
 */
export function getSortedSprints(entities: Entity[]): Sprint[] {
  return entities
    .filter(entity => entity.type === 'Sprint')
    .sort(sprintComparator) as Sprint[];
}

/**
 * Find sprint by id using binary search
 * @param sprints - Sprint array
 * @param sprintId - current Sprint id
 */
export function findCurrentSprint(
  sprints: Sprint[],
  sprintId: SprintId
): Sprint {
  for (let i = 0; i < sprints.length; i++) {
    const entity = sprints[i];
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
