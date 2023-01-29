var API_KEY = "a42435e03c9c146d3a0e1d9e9cbe326c";
// var API_ENDPOINT = "https://open-weather13.p.rapidapi.com/city/" + city;
var city = "mexico city";
// var currentWeatherURL ="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

// //put this in a function when you click search button
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
// ).then(function (response) {
//   if(response.ok) {
//     return response.json();
//   }
// }).then(function(data) {
//   console.log(data); //Console logging what is fetched from the link above
//   var temp = data.main.temp; // current temperature variable is equal to the temperature from the API
//   var wind = data.wind.speed; // current wind speed variable is equal to the wind speed data from the API
//   var currentHumidity = data.main.humidity; //current humidity variable is equal to the humidity data in the API

//   //test code
//   console.log("This is the current temperature in mexico city: " + (temp - 273.14).toFixed(1) + " celcius");
//   console.log("This is the current humidity in mexico city: " + currentHumidity+"%");

//   //call function here
//   // showCurrentTemperature(temp); //show the API data from variable using showCurrentTemperature() function.
//   // getCurrentWind(wind);  //show the API data from variable using showCurrentTemperature() function.
//   // getCurrentHumidity(currentHumidity);
//   // getCurrentWeatherInMex(data, temp); //when calling functions - i'm not sure what i am doing in terms of the parameters that should be going in there.
// })

//Function 1 = handle the buttons for each city.
function showCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json("");
      } else {
        return "error";
      }
    })
    .then(function (data) {
      console.log(data);
      //assign data from API to variables.
      var currentTemperature = data.main.temp;
      var currentWindSpeed = data.wind.speed;
      var currentHumidity = data.main.humidity;

      document.getElementById("city-name-h2").textContent = city;
      //get the elements from the HTML and assign the textContent to the variable created above.
      document.getElementById("current-temperature").textContent =
        (currentTemperature - 273.15).toFixed(1) + " Celcius";
      document.getElementById(
        "current-wind"
      ).textContent = `Wind: ${currentWindSpeed} mph`;
      document.getElementById(
        "current-humidity"
      ).textContent = `Humidity: ${currentHumidity}%`;
      console.log("This is the current temp: " + currentTemperature);
      console.log("This is the current wind speed: " + currentWindSpeed);
      console.log("This is the current humidity: " + currentHumidity);
    });
}

// declare buttons as variables
var mexicoCityBtn = document.getElementById("mexico-city");
var manchesterBtn = document.getElementById("manchester-btn");
var londonBtn = document.getElementById("london-btn");
var gibraltarBtn = document.getElementById("gibraltar-btn");
var dublinBtn = document.getElementById("dublin-btn");
var sydneyBtn = document.getElementById("sydney-btn");

//Event listeners for buttons
mexicoCityBtn.addEventListener("click", function () {
  var city = "Mexico city";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});

manchesterBtn.addEventListener("click", function () {
  var city = "Manchester";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});

londonBtn.addEventListener("click", function () {
  var city = "London";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});
gibraltarBtn.addEventListener("click", function () {
  var city = "Gibraltar";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});
dublinBtn.addEventListener("click", function () {
  var city = "Dublin";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});
sydneyBtn.addEventListener("click", function () {
  var city = "Sydney";
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city);
});

//Function 2 = handle the search button and text box.





















// //current temperature function
// function showCurrentTemperature(temp) {
// var currentTemp = document.querySelector("#current-temperature");
// currentTemp.textContent = "Temperature: " + (temp - 273.15).toFixed(1)+ " Celcius" ;
// }

// //current wind
// function getCurrentWind(wind){
//   var currentWind = document.querySelector("#current-wind");
//   currentWind.textContent = "Wind: " + wind.toFixed(1)+ " mph";
// }

// // current humidity
// function getCurrentHumidity(currentHumidity){
//   var currentHumidity = document.querySelector("#current-humidity");
//   currentHumidity.textContent = "Humidity: " + currentHumidity +"%";
// }

// function getCurrentWeatherInMex(data){

//   //assign variable to button (to)
//     var mexButton = document.querySelector("#ciudad-de-mexico"); //mexico city button

//     //assign variable to h2 selector
//     var changeCity = document.querySelector("#city-name-h2"); //h2 header for city name

//     //assigned variable to P tag selector
//     var temperature = document.querySelector("#current-temperature"); //p tag for current temperature

//       //click function
//     mexButton.addEventListener("click", function(){

//       //change h2 selector to API city name
//       changeCity.textContent = data.name;

//       //get the temperature from api and assign to variable
//       temperature.textContent = data.main.temp;

//       //console.logs to test
//       console.log(showCurrentTemperature(temperature));
//       console.log("The temp of Mexico City is: " + temperature); //this
//       console.log("this is the change city name: " + changeCity.textContent); //this works

//    //Change the temperature to mexico city temp
//     //Change the wind to mexico city temp
//   //display today's date using moment.js
//   //display the icon for the weather

// });

// }

// https://openweathermap.org/img/wn/${weatherIcon}.png

// function getWeather() {
//   var API_KEY = "ebcc27e216msh711f87fd1dd3e61p1f2ff5jsnac9530d6f442";
//   var API_ENDPOINT = "https://open-weather13.p.rapidapi.com/city/" + city;
//   var city = "mexico city";
// }
