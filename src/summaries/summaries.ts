import { Entity, Summary, SummaryId } from '../types/entities';

export function getSummaries(entities: Entity[]): Map<SummaryId, Summary> {
  return entities.reduce((acc, cur) => {
    if (cur.type !== 'Summary') return acc;
    acc.set(cur.id, cur);
    return acc;
  }, new Map());
}
