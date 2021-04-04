const { findCurrentSprint } = require('./prepareData');
const input = require('../examples/input.json');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

test('Find current sprint: existing', () => {
  expect(findCurrentSprint(input, 977)).toStrictEqual(CURRENT_SPRINT);
});

test('Find current sprint: non-existing', () => {
  const expected = null;
  expect(findCurrentSprint(input, 1)).toBe(expected);
});
