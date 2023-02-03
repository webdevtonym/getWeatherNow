//changes i need to make
//The page needs to start with no buttons and no data and only have the search button and text box. 
// when a user searches for a city a button is a added onto the page and saved into local storage and that repeats for each button
//and each time they search for a new city.

// Buttons need to be persistent and store in local storage

var API_KEY = "9f13742bedf90292ac76d40eac54706c";
// var city = document.getElementById("search-input").value;
var city = "mexico city";

console.log(showCurrentWeather());

//Function 1 = handle the buttons for each city.
function showCurrentWeather(city, API_KEY) {
  var promptAPI = prompt('Enter your API key');
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${promptAPI}`)
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
        "Temperature: " + (currentTemperature - 273.15).toFixed(1) + " Celcius";
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



//remove buttons
//add a loop to add buttons dynamically to the page and change the name of the button to the city tha the user chooses.
//buttons must add to local storage and be there when the page refreshes.


//------------------------------------USER INPUT------------------------------------//

// declare search button as a variable
var searchBtn = document.getElementById("search-button");

//declare search box as a variable
var searchBox = document.getElementById('search-input').textContent;

// //declare a variable to handle the value
// var output = document.getElementById('city-name-h2');
// output.textContent = searchBox.value; // Get user entered value from text box


//Event listeners for buttons
searchBtn.addEventListener("click", function () {
  document.getElementById("city-name-h2").style.fontSize = "2em"; //target the html element city-name-h2 and change the html text.
  //the value of the text in the box needs to be matched to the same value in the api object.








  // var city = prompt("Enter the city name");
  //NEED TO ADD TODAYS CURRENT DATE
  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city, API_KEY);
  renderButtons(city);
  fiveDayForecast(city);

});


//--------------------------------Render Buttons dynamically-----------------------------//

  //Render buttons on page dynamically when user chooses their city and clicks the button

var buttonsArr = [];

function renderButtons() {
  $("buttons").empty; //clear anything inside the buttons div prior to the loop starting

  for (var i = 0; i < buttonsArr.length; i++) {
    var btn = $("<button>"); // assign html to button variable
    btn.addClass("btn"); // create a class
    btn.attr("data-name", buttonsArr[i]); //adding data attribute at with a value of i for the buttonsArr array
    btn.text(buttonsArr[i]); //Give the button text from the value of the i in the buttonsArr
    $("buttons").append(buttonsArr); //add the button to the buttons div
    //SOMEHOW NEED TO APPEND THE CHOICE OF THE USER STORED IN THE ARRAY TO THE PAGE.
  }
}



//-------------------------------------------Get 5 day forecast----------------------------------------//


//Function 2 = get the 5 day forecast
function fiveDayForecast(city, API_KEY) {
  //put parameters lat and lon in the function above

   var url = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${API_KEY}`;
   
  // var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  // `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json("");
      }
    })
    .then(function (data) {

      console.log(data); //to test output
      var forecastData = data.list;

      for (let i = 0; i < forecastData.length; i += 8) {
        const day = forecastData[i];
        const date = new Date(day.dt * 1000);
        const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        const wind = data.list[0].wind.speed;
        const temperature = day.main.temp - 275.15;
        const fixedTemperature = temperature.toFixed(2);
        const humidity = data.list[0].main.humidity;
        const dayElement = document.getElementById(`day${i / 8 + 1}`);

        if (dayElement) {
          dayElement.innerHTML = `
    <p>Date: ${formattedDate}</p>
    <p>Wind: ${wind} kph</p>
    <p>Temperature: ${fixedTemperature}°C</p>
    <p>Humidity: ${humidity}%</p>
  `;
        } else {
          console.error(
            `Element with id "#day${i / 8 + 1}" not found in the HTML document`
          );
        }
      }
    }
    )

}

fiveDayForecast();


















// Function 3 = handle the search button and text box.
// function searchCityWeather(){

// }


// ==================================================================================================================================================================

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




// var lat = "19.389385";
// var lon = "-99.144308";

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


// manchesterBtn.addEventListener("click", function () {
//   document.getElementById("city-name-h2").style.fontSize = "2em";
//   var city = "Manchester";
//   //NEED TO ADD TODAYS CURRENT DATE
//   //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
//   showCurrentWeather(city);
// });

// londonBtn.addEventListener("click", function () {
//   document.getElementById("city-name-h2").style.fontSize = "2em";
//   var city = "London";
//   //NEED TO ADD TODAYS CURRENT DATE
//   //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
//   showCurrentWeather(city);
// });

// gibraltarBtn.addEventListener("click", function () {
//   document.getElementById("city-name-h2").style.fontSize = "2em";
//   var city = "Gibraltar";
//   //NEED TO ADD TODAYS CURRENT DATE
//   //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
//   showCurrentWeather(city);
// });
// dublinBtn.addEventListener("click", function () {
//   document.getElementById("city-name-h2").style.fontSize = "2em";
//   var city = "Dublin";
//   //NEED TO ADD TODAYS CURRENT DATE
//   //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
//   showCurrentWeather(city);
// });
// sydneyBtn.addEventListener("click", function () {
//   document.getElementById("city-name-h2").style.fontSize = "2em";
//   var city = "Sydney";
//   //NEED TO ADD TODAYS CURRENT DATE
//   //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
//   showCurrentWeather(city);
// });
