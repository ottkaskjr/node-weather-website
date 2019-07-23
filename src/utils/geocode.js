const request = require('request');
//one reusable function for l
const geocode = (address, callback) => {
  //encodeURIComponent is a function that prevents user submitted special characters from crashing the script
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoib3R0a2Fza2pyIiwiYSI6ImNqeDdlcDUydTA4eXgzeWp5MjQ5ZzI5bmMifQ.mJIaztnIk2HMpNXDBrVVig&limit=1';

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      //we give value to err but leave res undefined
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location!', undefined);
    } else {
      //we leave err undefined and get value for res
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
