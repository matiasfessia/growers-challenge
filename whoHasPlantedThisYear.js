/*
 * Get a list of the growers that have planted a specific type of corn on the current year
 * 
 * @param {object} data.
 * @param {string} cropType the type of corn to filter.
 * @returns {Array.<Object>}
 * 
 */
const whoHasPlantedThisYear = (data, cropType) => {
  if (typeof cropType === 'undefined') {
    throw new Error('The cropType parameter must be defined');
  }

  let plantingsEventOfThisYear = {};
  for (const grower of data) {
    for (const farm of grower.farms) {
      for (const plantingEvent of farm.plantingEvents) {
        if (isPlantedThisYear(plantingEvent, cropType)) {
          const plantingEventDate = new Date(plantingEvent.date).getTime();
          if (typeof plantingsEventOfThisYear[grower.name] === 'undefined') {
            plantingsEventOfThisYear[grower.name] = plantingEventDate;
          } else if (plantingsEventOfThisYear[grower.name] > plantingEventDate) {
            plantingsEventOfThisYear[grower.name] = plantingEventDate;            
          }
        }
      }
    }
  }
  const results = Object.keys(plantingsEventOfThisYear).map((grower) => ({ grower, date: plantingsEventOfThisYear[grower] }));
  return sortResultsByDate(results);
}

/*
 * Check if the plantingEvent was on the current year.
 * 
 * @param {object} plantingEvent.
 * @param {string} cropType.
 * @returns {boolean}
 * 
 */
const isPlantedThisYear = (plantingEvent, cropType) => {
  const currentYear = new Date().getFullYear();
  if ((new Date(plantingEvent.date).getFullYear() === currentYear) && (plantingEvent.cropType === cropType)) {
    return true;
  }
  return false;
};

/*
 * Sort the array that contains the lasted planting events by grower.
 * 
 * @param {Array.<Object>} results The array to be sorted.
 * @returns {Array.<Object>} The same array sorted by date.
 * 
 */
const sortResultsByDate = (results) => (
  results.sort((r1, r2) => {
    if (r1.date < r2.date) {
      return -1;
    }
    if (r1.date > r2.date) {
      return 1;
    }
    return 0;
  })
);

module.exports = whoHasPlantedThisYear;
