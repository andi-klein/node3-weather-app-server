const request = require("request");

const weather = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=68b79368fbadf7c4d03ce786066afe2d&query=" +
    latitude +
    "," +
    longitude;

    console.log(url);

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
    const descriptions = body.current.weather_descriptions;
    const icons = body.current.weather_icons;

    //console.log(`Current temperature in ${location} is ${temperature}℃`);

    callback(undefined, { location, temperature, descriptions, icons });
  });
};

module.exports = weather;
