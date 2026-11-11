// CCT360 Lab 6 - Final Version
// Kevin Wang
// I am using Open-Meteo to check Mississauga weather.

let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m,cloud_cover&timezone=America%2FToronto";

let refreshButton = document.querySelector("#refresh-button");

function getWeather() {

    document.querySelector("#status").textContent = "I am loading the weather...";

    fetch(apiURL)
        .then(response => {

            // I check if the API request worked.
            if (!response.ok) {
                throw new Error("Request failed");
            }

            return response.json();
        })
        .then(data => {

            console.log(data);

            // I get three values from the JSON data.
            let temperature = data.current.temperature_2m;
            let wind = data.current.wind_speed_10m;
            let clouds = data.current.cloud_cover;

            // I show the numbers on my webpage.
            document.querySelector("#temperature").textContent = temperature + "°C";
            document.querySelector("#wind-speed").textContent = wind + " km/h";
            document.querySelector("#cloud-cover").textContent = clouds + "%";
            document.querySelector("#reading-time").textContent = data.current.time;

            // I change the background and my message.
            if (temperature < 10) {
                document.body.className = "cold";
                document.querySelector("#message").textContent = "It is cold today. I should bring a jacket.";
            }
            else if (temperature < 25) {
                document.body.className = "mild";
                document.querySelector("#message").textContent = "The temperature feels pretty nice to me.";
            }
            else {
                document.body.className = "hot";
                document.querySelector("#message").textContent = "It is hot today. I should drink more water.";
            }

            // I also use if/else for the wind message.
            if (wind > 25) {
                document.querySelector("#wind-message").textContent = "It looks windy. I should be ready for that.";
            }
            else {
                document.querySelector("#wind-message").textContent = "The wind does not look too strong right now.";
            }

            // I use the temperature to change a CSS height.
            // I add 20 so my bar can still show cold temperatures.
            let barHeight = (temperature + 20) * 5;

            // I keep the bar inside the box.
            if (barHeight < 5) {
                barHeight = 5;
            }
            else if (barHeight > 220) {
                barHeight = 220;
            }

            document.querySelector("#temperature-bar").style.height = barHeight + "px";
            document.querySelector("#bar-message").textContent = "My temperature bar is showing " + temperature + "°C.";

            // Cloud cover is a percentage, so I use it as the width.
            document.querySelector("#cloud-bar").style.width = clouds + "%";
            document.querySelector("#cloud-message").textContent = "The cloud cover right now is " + clouds + "%.";

            document.querySelector("#status").textContent = "I got the latest weather data from Open-Meteo.";
        })
        .catch(error => {

            console.error("Error:", error);
            document.querySelector("#status").textContent = "I could not load the weather. Please try again.";
        });
}

// I can click the button to request the weather again.
refreshButton.addEventListener("click", getWeather);

// I want the weather to load when the page first opens.
getWeather();
