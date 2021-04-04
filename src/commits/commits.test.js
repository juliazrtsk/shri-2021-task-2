const { getUsersCommitsForSprint } = require('./commits');
const serverData = require('../../examples/input.json');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

const COMMITS_TEST_DATA = [
  {
    id: 'f9a4e23e2e695e0a463b2a73335cdabf9c975b39',
    type: 'Commit',
    timestamp: 1603928858553,
    message: 'соединить онлайн кортеж',
    author: 1,
    summaries: [7674],
  },
  {
    id: 'eb320bb73159aaa08b56a6fb1f56357dee2cd0e1',
    type: 'Commit',
    timestamp: 1604030931265,
    message: 'обойти онлайн ограничитель',
    author: 2,
    summaries: [7353, 7354, 7355, 7356, 7357, 7358, 7359],
  },
  {
    id: '6250b30b1171f6c48ec9abd255dbd6aedf6ba6ef',
    type: 'Commit',
    timestamp: 1503984280824,
    message: 'Wrong sprint',
    author: 3,
    summaries: [7632],
  },
  {
    id: '6250b30b1171f6c48ec9abd255dbd6aedf6ba6ef',
    type: 'Commit',
    timestamp: 1603984280824,
    message: 'экспортировать основной массив',
    author: 1,
    summaries: [7632],
  },
];

test('Find commits of all users for current sprint', () => {
  const expected = new Map();
  expected.set(1, 2);
  expected.set(2, 1);
  expect(
    getUsersCommitsForSprint(COMMITS_TEST_DATA, CURRENT_SPRINT)
  ).toStrictEqual(expected);
});

test('Find commits of all users for another sprint', () => {
  const expected = new Map();
  expected.set(3, 1);
  expect(
    getUsersCommitsForSprint(COMMITS_TEST_DATA, {
      ...CURRENT_SPRINT,
      startAt: 1503984280000,
      finishAt: 1504984280000,
    })
  ).toStrictEqual(expected);
});

test('Find commits of all users for sprint: no commits for sprint', () => {
  const expected = new Map();
  expect(
    getUsersCommitsForSprint(COMMITS_TEST_DATA, {
      ...CURRENT_SPRINT,
      startAt: 1,
      finishAt: 2,
    })
  ).toStrictEqual(expected);
});

test('Find commits of all users for sprint: null sprint', () => {
  const expected = new Map();
  expect(getUsersCommitsForSprint(COMMITS_TEST_DATA)).toStrictEqual(expected);
});

test('Find commits of all users for sprint: server data', () => {
  const expected = new Map();
  expected.set(1, 2);
  expected.set(10, 4);
  expected.set(11, 7);
  expected.set(12, 5);
  expected.set(2, 6);
  expected.set(3, 4);
  expected.set(4, 6);
  expected.set(5, 7);
  expected.set(6, 21);
  expected.set(7, 3);
  expected.set(8, 28);
  expected.set(9, 11);

  expect(getUsersCommitsForSprint(serverData, CURRENT_SPRINT)).toStrictEqual(
    expected
  );
});
