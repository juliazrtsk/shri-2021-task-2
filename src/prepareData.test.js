const input = require('../examples/input.json');

const { findCurrentSprint } = require('./prepareData');

test('Find current sprint: existing', () => {
  const expected = {
    id: 977,
    type: 'Sprint',
    name: 'Последний вагон',
    startAt: 1603573502000,
    finishAt: 1604178302000,
  };
  expect(findCurrentSprint(input, 977)).toStrictEqual(expected);
});

test('Find current sprint: non-existing', () => {
  const expected = null;
  expect(findCurrentSprint(input, 1)).toBe(expected);
});
