import { DiagramCommitCategory, DiagramData } from 'src/types/slides';
import { SlideConfigDiagram, SlideDataDiagram } from 'src/types/config';
import { Sprint } from 'src/types/entities';

const commitCategoriesWeight = {
  extra: 4,
  max: 3,
  mid: 2,
  min: 1,
};

export function toDiagram(
  slideConfig: SlideConfigDiagram,
  slideData: SlideDataDiagram,
  sprint: Sprint
): DiagramData {
  const { currentSprint, prevSprint } = slideData;
  const {
    title,
    totalText: transformTotal,
    differenceText: transformDiff,
    valueText: transformValue,
    categories: categoriesText,
  } = slideConfig;

  const categories: DiagramCommitCategory[] = [...currentSprint.stats.entries()]
    .sort((a, b) => commitCategoriesWeight[b[0]] - commitCategoriesWeight[a[0]])
    .map(
      entry =>
        ({
          title: categoriesText[entry[0]],
          valueText: transformValue(entry[1]),
          differenceText: transformValue(
            entry[1] - prevSprint.stats.get(entry[0])
          ),
        } as DiagramCommitCategory)
    );
  return {
    title,
    subtitle: sprint.name,
    totalText: transformTotal(currentSprint.total),
    differenceText: transformDiff(currentSprint.total - prevSprint.total),
    categories,
  };
}
