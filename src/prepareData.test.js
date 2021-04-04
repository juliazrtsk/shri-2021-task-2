const { prepareData } = require('./prepareData');

const input = require('../examples/input.json');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

test('Prepare data', () => {
  expect(prepareData(input, CURRENT_SPRINT)).toStrictEqual([]);
});
