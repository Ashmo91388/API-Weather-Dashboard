
//Using API key from 
var weatherApiKey = "a6ab1061f0a62a0088f003fabf585276";

// Form submission handler 
var handleFormSubmit = function(event) {
    event.preventDefault();

    var locationInput = document.getElementById("location-input");
    var location = locationInput.value;    

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + weatherApiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // current weather information
            var cityNameElement = document.getElementById("city-name");
            cityNameElement.textContent = data.city.name;

            var temperatureElement = document.getElementById("temperature");
            temperatureElement.textContent = data.list[0].main.temp;

            var windElement = document.getElementById("wind");
            windElement.textContent = data.list[0].wind.speed;

            var humidityElement = document.getElementById("humidity");
            humidityElement.textContent = data.list[0].main.humidity;

            // to update forecast 
            var forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = ""; 

            for (var i = 0; i < data.list.length; i += 8) {
                var forecast = data.list[i];

                var forecastCard = document.createElement("div");
                forecastCard.classList.add("forecast-card");

                var dateElement = document.createElement("p");
                dateElement.textContent = forecast.dt_txt;
                forecastCard.appendChild(dateElement);

                var temperatureElement = document.createElement("p");
                temperatureElement.textContent = "Temp: " + forecast.main.temp;
                forecastCard.appendChild(temperatureElement);

                var windElement = document.createElement("p");
                windElement.textContent = "Wind: " + forecast.wind.speed;
                forecastCard.appendChild(windElement);

                var humidityElement = document.createElement("p");
                humidityElement.textContent = "Humidity: " + forecast.main.humidity;
                forecastCard.appendChild(humidityElement);

                forecastContainer.appendChild(forecastCard);
            }
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
};

// event listener for the form
var locationForm = document.getElementById("location-form");
locationForm.addEventListener("submit", handleFormSubmit);
