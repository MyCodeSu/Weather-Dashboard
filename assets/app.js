// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const apiKey = "4b2fa07fb7030ef840b93e9c3ec4f585";

var formSubmission = document.getElementsByName("searchCity")[0];

// function to get user's city search
var formSubmissionHandler = document.querySelector("#submit").addEventListener("click", function (event) {
    event.preventDefault();
    var cityName = formSubmission.value.trim();
    removeDivs();

    if (cityName) {
        getCurrentCityData(cityName);
        getFutureCityData(cityName);
        formSubmission.value = "";

    } else {
        alert("Please enter a city name");
    };
})


// // function to fetch CURRENT location specific data.
var getCurrentCityData = function (city) {
    var weatherCurrentURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&appid=" + apiKey;
    fetch(weatherCurrentURL).then(response => {
        if (response.ok) {
            response.json().then(function (data) {

                genCurrentWeatherData(data);
            })
        } else {
            alert("Please enter a city name.");
        }
    })
        .catch(error => {
            alert(error);
        });
};

// function to remove divs (current and forecast weather)
function removeDivs() {
    var removeCurrentWeatherDiv = document.getElementById("currentDateDiv");

    if (!removeCurrentWeatherDiv) {
        console.log("nothing to delete.")
    } else {
        removeCurrentWeatherDiv.remove();
    }
}


// function to get current date weather content
function genCurrentWeatherData(data) {
    var cityNameDisplay = data.name;
    const currentDate = new Date();
    var currentIcon = data.weather[0].icon;
    var currentIconImg = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
    var currentWeatherDescription = data.weather[0].description;
    var currentTemp = "Temperature: " + Math.round(data.main.temp) + " °C";
    var currentWind = "Wind speed: " + data.wind.speed + " m/s";
    var currentHumid = "Humidity: " + data.main.humidity + "%";

    // create div
    var currentDateDiv = document.createElement("div");
    currentDateDiv.setAttribute("id", "currentDateDiv");
    document.getElementById("currentWeather").appendChild(currentDateDiv);

    // City and Date
    var h1Container = document.createElement("h1");
    currentDateDiv.appendChild(h1Container).innerText = cityNameDisplay + "   " + currentDate;

    // Icon
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", currentIconImg);
    imgEl.setAttribute("alt", currentWeatherDescription);
    currentDateDiv.appendChild(imgEl);

    // Weather info
    var currentTempContainer = document.createElement("p");
    currentDateDiv.appendChild(currentTempContainer).innerText = currentTemp;

    var currentWindContainer = document.createElement("p");
    currentDateDiv.appendChild(currentWindContainer).innerText = currentWind;

    var currentHumidContainer = document.createElement("p");
    currentDateDiv.appendChild(currentHumidContainer).innerText = currentHumid;

}


// // function to fetch future location specific data.

var getFutureCityData = function (city) {
    var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + city + "&appid=" + apiKey;
    fetch(weatherForecastURL).then(response => {
        if (response.ok) {
            response.json().then(function (data) {
                getForecastData(data);
            })
        } else {
            alert("Please enter a city name.");
        }
    })
        .catch(error => {
            alert("Cannot connect to Open Weather. Please try again.");
        });
};

// function to get forecast weather content
function getForecastData(data) {
    for (var i =0; i < 5; i++) { 
    const forecastDate = data.list[(i+1) * 8 -1].dt_txt;
    var forecastIcon = data.list[(i+1) * 8 -1].weather[0].icon;
    var forecastIconImg = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
    var forecastWeatherDescription = data.list[(i+1) * 8-1].weather[0].description;
    var forecastTemp = "Temperature: " + Math.round(data.list[(i+1) * 8-1].main.temp) + " °C";
    var forecastWind = "Wind speed: " + data.list[(i+1) * 8-1].wind.speed + " m/s";
    var forecastHumid = "Humidity: " + data.list[(i+1) * 8-1].main.humidity + "%";

    // create div
    var forecastDiv = document.createElement("div");
    forecastDiv.setAttribute("id", "forecastDiv" + [i + 1]);
    var forecastDivId = document.getElementById("forecastDiv" + [i + 1]);
    document.getElementById("futureWeather").appendChild(forecastDiv);

    // City and Date
    var h1Container = document.createElement("h1");
    document.getElementById("forecastDiv"+[i+1]).appendChild(h1Container).innerText = forecastDate;

    // Icon
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", forecastIconImg);
    imgEl.setAttribute("alt", forecastWeatherDescription);
    document.getElementById("forecastDiv"+[i+1]).appendChild(imgEl);

    // Weather info
    var forecastTempContainer = document.createElement("p");
    document.getElementById("forecastDiv"+[i+1]).appendChild(forecastTempContainer).innerText = forecastTemp;

    var forecastWindContainer = document.createElement("p");
    document.getElementById("forecastDiv"+[i+1]).appendChild(forecastWindContainer).innerText = forecastWind;

    var forecastHumidContainer = document.createElement("p");
    document.getElementById("forecastDiv"+[i+1]).appendChild(forecastHumidContainer).innerText = forecastHumid;
    }
}
