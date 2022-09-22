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
var formSubmissionHandler = document.querySelector("#submit").addEventListener("click", function(event) {
    event.preventDefault();
    var cityName = formSubmission.value.trim();


    if (cityName) {
        getCurrentCityData(cityName);
        formSubmission.value = "";
    } else {
        alert("Please enter a city name");
    };
})


// function to fetch current location specific data.
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

// current date weather content
function genCurrentWeatherData(data) {
var cityNameDisplay = data.name;
const currentDate = new Date();
var currentIcon = data.weather[0].icon;
var currentIconImg = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
var currentWeatherDescription = data.weather[0].description;
var currentTemp = data.main.temp;
var currentWind = "Wind speed: " + data.wind.speed + " m/s";
var currentHumid = data.main.humidity;

document.createElement("h1").innerText = cityNameDisplay+"   "+currentDate;
var imgEl = document.createElement("img");
imgEl.setAttribute("src", currentIconImg);
imgEl.setAttribute("alt", currentWeatherDescription);


}

// get current weather data
// var currentData = function (data) {
 
//     genCurrentWeatherData(data);



// }


// function to fetch future location specific data.

var getFutureCityData = function (city) {
    var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + city + "&appid=" + apiKey;
    fetch(weatherUrl).then(response => {
        if (response.ok) {
            response.json().then(function (data) {

            })
        } else {
            alert("Please enter a city name.");
        }
    })
        .catch(error => {
            alert("Cannot connect to Open Weather. Please try again.");
        });
};

// city name

// Date

// icon

// temperature

// wind

// humidity

