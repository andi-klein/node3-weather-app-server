const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=7ceed3a8ce2a4f5664d55ff0f1db0b14&limit=1&query=" +
    encodeURIComponent(address);

    console.log(url);

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(
        "Unable to connector to GeoCoding API. Cause: " + error,
        undefined
      );
      return;
    }

    if (body.error) {
      //console.log(apiResponse);

      callback("Bad Request! Error: " + body.error.message, undefined);
      return;
    }

    if (body.data.length < 1) {
      callback("No results found!", undefined);
      return;
    }

    //console.log(apiResponse);

    const place = body.data[0].label;
    const latitude = body.data[0].latitude;
    const longitude = body.data[0].longitude;

    //console.log(`Result: ${place} is located at ${latitude},${longitude}`);

    callback(undefined, {
      place,
      latitude,
      longitude,
    });
  });
};

module.exports = geocode;
