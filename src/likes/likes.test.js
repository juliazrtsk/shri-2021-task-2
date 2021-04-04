const { getUsersLikesForSprint } = require('./likes');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

const LIKES_TEST_DATA = [
  {
    id: '0746e46d-c808-44c9-ba1e-f64a542a1992',
    type: 'Comment',
    author: 3,
    message: '.',
    createdAt: 1603965569072.6042,
    likes: [3],
  },
  {
    id: '0bde575e-a73e-4936-833c-2beca4b778af',
    type: 'Comment',
    author: 5,
    message: '.',
    createdAt: 1603577791882.689,
    likes: [11, 5, 11, 5, 11, 5],
  },
  {
    id: '0746e46d-c808-44c9-ba1e-f64a542a1992',
    type: 'Comment',
    author: 3,
    message: '.',
    createdAt: 1603965569072.6042,
    likes: [5, 11, 4],
  },
];

test('Find likes of all users for sprint', () => {
  const expected = new Map();
  expected.set(3, 4);
  expected.set(5, 6);
  expect(getUsersLikesForSprint(LIKES_TEST_DATA, CURRENT_SPRINT)).toStrictEqual(
    expected
  );
});

test('Find likes of all users for sprint: no comments for sprint', () => {
  const expected = new Map();
  const sprint = {
    id: 1,
    type: 'Sprint',
    name: 'Test sprint',
    startAt: 1503573502000,
    finishAt: 1504178302000,
  };
  expect(getUsersLikesForSprint(LIKES_TEST_DATA, sprint)).toStrictEqual(
    expected
  );
});

test('Find likes of all users for sprint: null sprint', () => {
  const expected = new Map();
  expect(getUsersLikesForSprint(LIKES_TEST_DATA)).toStrictEqual(expected);
});
