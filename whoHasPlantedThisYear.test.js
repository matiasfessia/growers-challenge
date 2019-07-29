const fs = require('fs');
const whoHasPlantedThisYear = require('./whoHasPlantedThisYear');
const rawdata = fs.readFileSync('data-example.json');
const data = JSON.parse(rawdata);

test('it should return three growers that have planted soybeans in 2019', () => {
  const result = whoHasPlantedThisYear(data, 'soybeans');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(2);
});

test('it should return one grower that have planted corn in 2019', () => {
  const result = whoHasPlantedThisYear(data, 'corn');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(1);
});

test('it should return none growers that have planted corn in 2019', () => {
  const result = whoHasPlantedThisYear(data, 'sorghum');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(0);
});

test('it should return an error if the cropType parameter is not defined', () => {
  try {
    whoHasPlantedThisYear(data);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('The cropType parameter must be defined');
  }
});