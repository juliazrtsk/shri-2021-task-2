const { getUsersLikesMap } = require('./likes');
const { getSprintEntities } = require('../sprints/sprints');

const serverData = require('../../examples/input.json');

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
  const sprintEntities = getSprintEntities(LIKES_TEST_DATA, CURRENT_SPRINT);
  expect(getUsersLikesMap(sprintEntities)).toStrictEqual(expected);
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
  const sprintEntities = getSprintEntities(LIKES_TEST_DATA, sprint);
  expect(getUsersLikesMap(sprintEntities)).toStrictEqual(expected);
});

test('Find likes of all users for sprint: null entities array', () => {
  const expected = new Map();
  expect(getUsersLikesMap()).toStrictEqual(expected);
});

test('Find likes of all users for sprint: server data', () => {
  const expected = new Map();
  expected.set(1, 270);
  expected.set(10, 212);
  expected.set(11, 224);
  expected.set(12, 210);
  expected.set(2, 242);
  expected.set(3, 216);
  expected.set(4, 273);
  expected.set(5, 284);
  expected.set(6, 264);
  expected.set(7, 306);
  expected.set(8, 305);
  expected.set(9, 219);

  const sprintEntities = getSprintEntities(serverData, CURRENT_SPRINT);
  expect(getUsersLikesMap(sprintEntities)).toStrictEqual(expected);
});
