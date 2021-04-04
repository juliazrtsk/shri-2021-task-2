const serverData = require('../../examples/input.json');
const { findCurrentSprint, doesSprintContainEntity } = require('./sprints');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

test('Find current sprint: existing', () => {
  expect(findCurrentSprint(serverData, CURRENT_SPRINT.id)).toStrictEqual(
    CURRENT_SPRINT
  );
});

test('Find current sprint: non-existing', () => {
  const expected = null;
  expect(findCurrentSprint(serverData, 1)).toBe(expected);
});

test('Check if sprint contains entity: existing entity, Commit type', () => {
  const commit = {
    id: 'f9a4e23e2e695e0a463b2a73335cdabf9c975b39',
    type: 'Commit',
    timestamp: 1603928858553,
    message: 'соединить онлайн кортеж',
    author: 1,
    summaries: [7674],
  };
  expect(doesSprintContainEntity(commit.timestamp, CURRENT_SPRINT)).toBe(true);
});

test('Check if sprint contains entity: existing entity, User type', () => {
  const user = {
    id: 5,
    type: 'User',
    name: 'Александр Николаичев',
    login: 'nikolaichev',
    avatar: '5.jpg',
    friends: [],
    comments: [],
    commits: [],
  };
  expect(doesSprintContainEntity(user.timestamp, CURRENT_SPRINT)).toBe(false);
});
