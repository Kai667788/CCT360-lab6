// CCT360 Lab 6 - Class Progress
// Kevin Wang
// I am using Open-Meteo to get weather data for Mississauga.

let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m";

let refreshButton = document.querySelector("#refresh-button");

function getWeather() {

    document.querySelector("#status").textContent = "Loading weather...";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            let temperature = data.current.temperature_2m;

            // First I show the temperature on my page.
            document.querySelector("#temperature").textContent = temperature + "°C";

            // Then I change the message and background colour.
            if (temperature < 10) {
                document.body.className = "cold";
                document.querySelector("#message").textContent = "It is pretty cold today. I should wear a jacket.";
            }
            else if (temperature < 25) {
                document.body.className = "mild";
                document.querySelector("#message").textContent = "The weather feels pretty nice today.";
            }
            else {
                document.body.className = "hot";
                document.querySelector("#message").textContent = "It is hot outside today.";
            }

            document.querySelector("#status").textContent = "Weather loaded from Open-Meteo.";
        })
        .catch(error => {
            console.error("Error:", error);
            document.querySelector("#status").textContent = "I could not load the weather. Please try again.";
        });
}

refreshButton.addEventListener("click", getWeather);

getWeather();

// TODO for my next update:
// 1. Get the wind speed from the API.
// 2. Try making a bar that changes with the temperature.
// 3. Add more information to the page.
