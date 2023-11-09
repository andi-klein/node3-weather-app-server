const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const errorMessage = document.querySelector("#errorMessage");
const output = document.querySelector("#output");

weatherForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const address = search.value;

    errorMessage.textContent = "";
    output.textContent = ("Fetching weather data for address: "+address);

    fetch("./weather?address=" + address).then((response) => {
      response.json().then((data) => {
        if (data.error) {
            errorMessage.textContent = "An unexpected error has occurred: " + data.error;
            output.textContent = "";
        } else {
            errorMessage.textContent = "";
            output.textContent = "Location: " + data.location+" - Current temperature: " + data.temperature + "°C";
        }
      });
    });
})
