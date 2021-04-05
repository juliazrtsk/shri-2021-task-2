import { ActivityDailyCommitStatistics, ActivityData } from 'src/types/slides';
import { SlideConfigActivity, SlideDataActivity } from 'src/types/config';
import { Sprint } from 'src/types/entities';

export function toActivity(
  slideConfig: SlideConfigActivity,
  slideData: SlideDataActivity,
  sprint: Sprint
): ActivityData {
  const { dailyCommitStatistics } = slideData;
  const { title } = slideConfig;

  const statistics: ActivityDailyCommitStatistics = [
    ...dailyCommitStatistics.entries(),
  ].reduce(
    (acc, entry) => {
      return { ...acc, [entry[0]]: entry[1] };
    },
    {
      sun: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
    }
  );

  return {
    title,
    subtitle: sprint.name,
    data: statistics,
  };
}
