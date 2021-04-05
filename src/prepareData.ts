import { slidesConfiguration } from 'src/slides/slidesConfiguration';
import { transformDataToSlide } from 'src/slides/slides';

import { getUsersLikesMap } from 'src/likes/likes';
import {
  getCommitsCountForAllSprints,
  getCommitsList,
  getCommitsStatistics,
  getCommitStatisticsTotal,
  getUsersCommitsMap,
} from 'src/commits/commits';
import { getUsers } from 'src/users/users';
import {
  getSortedSprints,
  getSprintEntities,
  findSprintById,
} from 'src/sprints/sprints';
import { getSummaries } from 'src/summaries/summaries';

import {
  Commit,
  Entity,
  Sprint,
  Summary,
  SummaryId,
  User,
  UserId,
} from 'src/types/entities';
import { Story } from 'src/types/slides';
import { CommitCategory, SlideConfig, SlideData } from 'src/types/config';

function prepareData(entities: Entity[], { id: sprintId }: Sprint): Story[] {
  const sprints: Sprint[] = getSortedSprints(entities);
  const users: Map<UserId, User> = getUsers(entities);
  const summaries: Map<SummaryId, Summary> = getSummaries(entities);

  const currentSprint: Sprint = findSprintById(sprints, sprintId);
  const prevSprint: Sprint = findSprintById(sprints, sprintId - 1);

  const sprintEntities: Entity[] = getSprintEntities(entities, currentSprint);
  const sprintCommits: Commit[] = getCommitsList(sprintEntities);

  const prevSprintEntities: Entity[] = getSprintEntities(entities, prevSprint);
  const prevSprintCommits: Commit[] = getCommitsList(prevSprintEntities);

  /* 1 */
  const currentSprintUsersCommitsMap: Map<UserId, number> = getUsersCommitsMap(
    sprintEntities
  );

  /* 2 */
  const currentSprintUsersLikesMap: Map<UserId, number> = getUsersLikesMap(
    sprintEntities
  );

  /* 3 */
  const sprintsCommitsCount = getCommitsCountForAllSprints(
    sprints,
    entities,
    currentSprint.id
  );

  /* 4 */
  const currentSprintCommitStatistics: Map<
    CommitCategory,
    number
  > = getCommitsStatistics(sprintCommits, summaries);

  const currentSprintTotal: number = getCommitStatisticsTotal(
    currentSprintCommitStatistics
  );

  const prevSprintCommitStatistics: Map<
    CommitCategory,
    number
  > = getCommitsStatistics(prevSprintCommits, summaries);

  const prevSprintTotal: number = getCommitStatisticsTotal(
    prevSprintCommitStatistics
  );

  const dataForSlides: { [key: string]: SlideData } = {
    leaders: {
      users,
      usersCommitsMap: currentSprintUsersCommitsMap,
    },
    vote: {
      users,
      usersLikesMap: currentSprintUsersLikesMap,
    },
    chart: {
      users,
      usersCommitsMap: currentSprintUsersCommitsMap,
      commits: sprintsCommitsCount,
    },
    diagram: {
      currentSprint: {
        stats: currentSprintCommitStatistics,
        total: currentSprintTotal,
      },
      prevSprint: {
        stats: prevSprintCommitStatistics,
        total: prevSprintTotal,
      },
    },
    activity: {},
  };

  const stories: Story[] = [];
  slidesConfiguration.forEach((slideConfig: SlideConfig) => {
    const slideData: SlideData = dataForSlides[slideConfig.alias];
    const slide: Story = transformDataToSlide(
      slideConfig,
      slideData,
      currentSprint
    );
    stories.push(slide);
  });

  return [];
}

module.exports = { prepareData };
