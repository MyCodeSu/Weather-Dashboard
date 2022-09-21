// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const express = require("express");
const app = express();
const https = require("https");
var city = "toronto";
var apiKey = "4b2fa07fb7030ef840b93e9c3ec4f585";
const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + apiKey;

    app.get("/", function (req, res) {
        https.get(weatherUrl, function (response) {
            console.log(response.statusCode);

            response.on("data", function (data) {
                var currentWeatherData = JSON.parse(data)
                var currentCityName = currentWeatherData.name;
          

                console.log(currentCityName);
            })
        })
        res.send("hi");
    })




app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})