//changes i need to make
//The page needs to start with no buttons and no data and only have the search button and text box.
// when a user searches for a city a button is a added onto the page and saved into local storage and that repeats for each button
//and each time they search for a new city.


//-------------Global Variables-----------------//

// declare search button as a variable
var searchBtn = document.getElementById("search-button");

//declare search box as a variable
var searchInput = document.getElementById("search-input");

// Buttons need to be persistent and store in local storage
var API_KEY = "b7fad981b71613187ec4f69ac3e60320";
var city;

//https://api.openweathermap.org/data/2.5/forecast?q=manchester&appid=b7fad981b71613187ec4f69ac3e60320
//------------------------------------USER INPUT------------------------------------//

//Event listener for search button button
https: searchBtn.addEventListener("click", function (event) {
  //very important to make sure it functions
  event.preventDefault(); //Works ok

  //adds the entered value to the city variable.
  city = searchInput.value; // works ok

  //ensures the first letter is captialised (important that this comes after setting the city to the value)
  city = city.charAt(0).toUpperCase() + city.slice(1); // works ok

  //NEED TO ADD AN ICON FOR THE CURRENT WEATHER
  showCurrentWeather(city); //run function to show today's weather

  // renderButtons(city);
  fiveDayForecast(city);
  // setLocalStorage();
  searchInput.value = "";
});

//----------------------Show today's weather for the chosen city in the top div------------------------//

//Function 1 = handle the buttons for each city.
function showCurrentWeather() {

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
      var weatherIcon = data.weather[0].icon;

      var iconImg = document.createElement("img");
      iconImg.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      //get the h2
      document.getElementById("city-name-h2").textContent =
        city + " " + "(" + getTodaysDate() + ")";
      document.getElementById("city-name-h2").appendChild(iconImg);
      document.getElementById("city-name-h2").style.fontSize = "2em";

      //get the elements from the HTML and assign the textContent to the variable created above.
      document.getElementById("current-temperature").textContent =
        "Temperature: " + (currentTemperature - 273.15).toFixed(1) + " Celcius";
      document.getElementById(
        "current-wind"
      ).textContent = `Wind: ${currentWindSpeed} mph`;
      document.getElementById(
        "current-humidity"
      ).textContent = `Humidity: ${currentHumidity}%`;
  
    });
}

//-----------------------Get today's date function------------------------//

function getTodaysDate() {
  var todayDate = moment().format("D/M/YYYY");
    // $("#date")
    //   .text("(" + todayDate + ")")
    //   .css("font-size", "1em");
  return todayDate;

  // console.log(todayDate);
}


//remove buttons
//add a loop to add buttons dynamically to the page and change the name of the button to the city that
// the user chooses.
//buttons must add to local storage and be there when the page refreshes.

//-------------------------------------------Get 5 day forecast----------------------------------------//

//Function 2 = get the 5 day forecast
function fiveDayForecast(city) {

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json("");
      }
    })
    .then(function (data) {
      var forecastData = data.list;

      for (let i = 0; i < forecastData.length; i += 8) {
        const day = forecastData[i]; //variable iterator so we can get each item in the API object
        const date = new Date(day.dt * 1000); 
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; //variable to show the dates
        const wind = data.list[0].wind.speed;
        const temperature = day.main.temp - 275.15; // get the temperature in...
        const fixedTemperature = temperature.toFixed(2); //move decimal place
        const humidity = data.list[0].main.humidity; //get humidity from API
        const dayElement = document.getElementById(`day${i / 8 + 1}`); //variable to iterate through each day in html

        //Icon code
        const weatherIcon = data.list[0].weather[0].icon; //get the icon from api (THIS WORKS)
        const iconImg = document.createElement("img"); //create a html element img and assign it to variable (THIS WORKS)
        // console.log("This is what is showing for the icon image: " + iconImg);
        iconImg.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; //assign variable to src of image file
        iconImg.style.width = "50px"; //give it a width
        iconImg.style.height = "50px"; //give it a height

        // document.querySelector(`#day${(i/8)+1}`).appendChild(iconImg);

        //take the class icon and append the variable to it
        console.log("This is the iconimage " + iconImg);

        console.log("this is the data from the 5 day forecast: " + data); //to test output

        if (dayElement) {
          dayElement.innerHTML = `
    <p>Date: ${formattedDate}<span></span></p>
    <p>Temp: ${fixedTemperature}°C</p>
    ${iconImg.outerHTML}
    <p>Wind: ${wind} kph</p>
    <p>Humidity: ${humidity}%</p>
  `;
        } else {
          console.error(
            `Element with id "#day${i / 8 + 1}" not found in the HTML document`
          );
        }
      }
    });
}


//--------------------------------Render Buttons dynamically-----------------------------//

//Render buttons on page dynamically when user chooses their city and clicks the button

// var buttonsArr = [];

// function renderButtons() {
//   $("buttons").empty; //clear anything inside the buttons div prior to the loop starting

//   for (var i = 0; i < buttonsArr.length; i++) {
//     var btn = $("<button>"); // assign html to button variable
//     btn.addClass("btn"); // create a class
//     btn.attr("data-name", buttonsArr[i]); //adding data attribute at with a value of i for the buttonsArr array
//     btn.text(buttonsArr[i]); //Give the button text from the value of the i in the buttonsArr
//     $("buttons").append(buttonsArr); //add the button to the buttons div
//     //SOMEHOW NEED TO APPEND THE CHOICE OF THE USER STORED IN THE ARRAY TO THE PAGE.
//   }
// }

// Function 3 = get today's date

// function searchCityWeather(){

// }

// ==================================================================================================================================================================






