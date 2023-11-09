const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const errorMessage = document.querySelector("#errorMessage");
const output = document.querySelector("#output");
const icon = document.querySelector("#icon");

weatherForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const address = search.value;

    errorMessage.textContent = "";
    output.textContent = ("Fetching weather data for address: "+address);
    icon.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";

    fetch("./weather?address=" + address).then((response) => {
      response.json().then((data) => {
        if (data.error) {
            errorMessage.textContent = "An unexpected error has occurred: " + data.error;
            output.textContent = "";
          } else {
            errorMessage.textContent = "";
            output.textContent = "Location: " + data.location
            +"\r\nCurrent temperature: " + data.temperature + "°C"
            +"\r\nConditions are " + data.descriptions[0]
            ;
            icon.src = data.icons[0];
        }
      });
    });
})
