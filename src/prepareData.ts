import { slidesConfiguration } from 'src/slides/slidesConfiguration';
import { transformDataToSlide } from 'src/slides/slides';

import { getUsersLikes } from 'src/likes/likes';
import { getCommitsForAllSprints, getUsersCommits } from 'src/commits/commits';
import { getUsers } from 'src/users/users';
import {
  getSortedSprints,
  findCurrentSprint,
  getSprintEntities,
} from 'src/sprints/sprints';

import { Entity, Sprint, User, UserId } from 'src/types/entities';
import { Story } from 'src/types/slides';
import { SlideConfig, SlideData } from 'src/types/config';

function prepareData(entities: Entity[], { id: sprintId }: Sprint): Story[] {
  const sprints: Sprint[] = getSortedSprints(entities);
  const users: Map<UserId, User> = getUsers(entities);
  const currentSprint: Sprint = findCurrentSprint(sprints, sprintId);
  const sprintEntities: Entity[] = getSprintEntities(entities, currentSprint);

  /* 1 */
  const currentSprintUsersCommitsMap: Map<UserId, number> = getUsersCommits(
    sprintEntities
  );

  /* 2 */
  const currentSprintUsersLikesMap: Map<UserId, number> = getUsersLikes(
    sprintEntities
  );

  /* 3 */
  const sprintsCommits = getCommitsForAllSprints(
    sprints,
    entities,
    currentSprint.id
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
      commits: sprintsCommits,
    },
    diagram: {},
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

  return stories;
}

module.exports = { prepareData };
