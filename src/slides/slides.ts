import { ActivityData, DiagramData, Story } from 'src/types/slides';
import { Sprint } from 'src/types/entities';
import { SlideConfig, SlideData } from 'src/types/config';

import { toLeaders } from 'src/slides/leaders';
import { toVote } from 'src/slides/vote';
import { toChart } from 'src/slides/chart';

const transformDataMap = {
  leaders: toLeaders,
  vote: toVote,
  chart: toChart,
  diagram: () => ({} as DiagramData),
  activity: () => ({} as ActivityData),
};

export function transformDataToSlide(
  slideConfig: SlideConfig,
  slideData: SlideData,
  currentSprint: Sprint
): Story {
  const transform = transformDataMap[slideConfig.alias];
  // @ts-ignore
  const data = transform(slideConfig, slideData, currentSprint);
  return {
    alias: slideConfig.alias,
    data,
  };
}
