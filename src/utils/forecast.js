const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/ce5bc66d786b0bee5bc47a194b8acd1b/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '?units=si';

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      //we give value to err but leave res undefined
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      //we give value to err but leave res undefined
      callback('Unable to find location.', undefined);
    } else {
      //we leave err undefined and get value for res
      callback(undefined, {
        //summary: body.currently.summary,
        //temperature: body.currently.temperature,
        //humidity: body.currently.humidity,
        //wind: body.currently.windSpeed
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
