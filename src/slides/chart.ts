import { ChartData, User as SlideUser } from 'src/types/slides';
import { SlideConfigChart, SlideDataChart } from 'src/types/config';
import { Sprint } from 'src/types/entities';

import { mapUsersToValuesForSlide } from 'src/users/users';

export function toChart(
  slideConfig: SlideConfigChart,
  slideData: SlideDataChart,
  currentSprint: Sprint
): ChartData {
  const { commits, users, usersCommitsMap } = slideData;
  const { title, valueText: transformValue } = slideConfig;
  const slideUsers: SlideUser[] = mapUsersToValuesForSlide(
    users,
    usersCommitsMap,
    transformValue
  );
  return {
    title,
    subtitle: currentSprint.name,
    values: commits,
    users: slideUsers,
  };
}
