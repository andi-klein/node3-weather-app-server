const request = require("request");

const weather = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=68b79368fbadf7c4d03ce786066afe2d&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connector to weather API. Cause: " + error),
        undefined;
      return;
    }

    if (body.error) {
      callback("Bad Request! Error: " + body.error.info, undefined);
      return;
    }

    const temperature = body.current.temperature;
    const location = body.location.name;

    //console.log(`Current temperature in ${location} is ${temperature}℃`);

    callback(undefined, { location, temperature });
  });
};

module.exports = weather;
