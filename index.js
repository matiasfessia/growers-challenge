const fs = require('fs');
const whoHasPlantedThisYear = require('./whoHasPlantedThisYear');

const rawdata = fs.readFileSync('data-example.json');
const result = whoHasPlantedThisYear(JSON.parse(rawdata), 'soybeans');
console.log('List of the growers that have planted soybeans more recently');
result.forEach((item, index) => {
  console.log(`#${index + 1} ${item.grower}`);
});