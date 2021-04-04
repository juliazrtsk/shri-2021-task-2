const prepareData = require('./prepareData');

test('adds 1 + 2 to equal 3', () => {
  expect(prepareData(1, 2)).toBe(3);
});
