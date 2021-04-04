const { prepareData } = require('./prepareData');

const serverData = require('../examples/input.json');
const expectedResult = require('../examples/output.json');

const CURRENT_SPRINT = {
  id: 977,
  type: 'Sprint',
  name: 'Последний вагон',
  startAt: 1603573502000,
  finishAt: 1604178302000,
};

test('Prepare data', () => {
  expect(prepareData(serverData, CURRENT_SPRINT)).toStrictEqual(expectedResult);
});
