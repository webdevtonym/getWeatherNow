// Problems with the program now

//1. if you don't enter code into the text box and press enter, a box with an empty string appears
//if this happens it should stop the program running and display an alert modal message to tell them to reenter the city name

//if they enter the nothing at all and click the button
//then it should alert them that they didnt enter a city and to try again
//the program should stop running completely
//No button should be added

//i could use an if statement to check the condition whether they enter correct or not.

//if they enter something that doesn't match the cities that are stored in the server API
//then it should alert them that they didnt enter a city and to try again
//the program should stop running completely
//No button should be added

//things tried: and if statement on the event listener, an if statement on the .then response and also the .then data.

//2. The modal i added does not appear and i get errors in the console.

//3. I want to hide my API key and also go back to github and remove all instances to it.

//4. trying to save the button to local storage and have it stay there even after refreshing the page.

//-------------Global Variables-----------------//

// declare search button as a variable
var searchBtn = document.getElementById("search-button");

//declare search box as a variable
var searchInput = document.getElementById("search-input");

// Buttons need to be persistent and store in local storage

//need to make API key hidden using gitIgnore
var API_KEY = "b7fad981b71613187ec4f69ac3e60320";
var city;
renderButtons();
//------------------------------------User Input------------------------------------//

//Event listener for search button button
searchBtn.addEventListener("click", function (event) {
  //very important to make sure it functions
  event.preventDefault();

  //adds the entered value to the city variable.
  city = searchInput.value;

  //ensures the first letter is captialised (important that this comes after setting the city to the value)
  city = city.charAt(0).toUpperCase() + city.slice(1);

  showCurrentWeather(city); //run function to show today's weather

  // renderButtons(city);
  fiveDayForecast(city);

  // setLocalStorage();
  searchInput.value = "";
});

//----------------------Show today's weather for the chosen city in the top div------------------------//

function showCurrentWeather(btncity) {
  city = btncity || city;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json("");
      } else {
        throw new Error("Not a valid city");
      }
    })
    .then(function (data) {
      renderButtons(city || btncity);

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
    })
    .catch((err) => {
      console.log(err);
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

//-------------------------------------------Get 5 day forecast----------------------------------------//

function fiveDayForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json("");
      } else {
        throw new Error("Not a valid city");
      }
    })
    .then(function (data) {
      var forecastData = data.list;

      for (let i = 0; i < forecastData.length; i += 8) {
        const day = forecastData[i]; //variable iterator so we can get each item in the API object
        const date = new Date(day.dt * 1000);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`; //variable to show the dates
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
        console.log("This is the iconimage " + JSON.stringify(iconImg));

        // console.log(
        //   "this is the data from the 5 day forecast: " + JSON.stringify(data)
        // ); //to test output

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
    })
    .catch((err) => {
      console.log(err);
    });
}
//--------------------------------Render Buttons dynamically-----------------------------//

//Render buttons on page dynamically when user chooses their city and clicks the button

function renderButtons(city) {
  $("#city-button").empty(); //clear anything inside the buttons div prior to the loop starting, links to the div button element
  var buttonsArr = JSON.parse(localStorage.getItem("cities")) || [];
  if (city && !buttonsArr.includes(city)) {
    buttonsArr.push(city);
    localStorage.setItem("cities", JSON.stringify(buttonsArr));
  }

  for (var i = 0; i < buttonsArr.length; i++) {
    var btn = $("<button>"); // assign html to button variable
    btn.addClass("city-btn"); // create a class
    btn.attr("value", buttonsArr[i]); //adding data attribute at with a value of i for the buttonsArr array
    btn.text(buttonsArr[i]); //Give the button text from the value of the i in the buttonsArr
    btn.click(function (event) {
      event.preventDefault();
      console.log(buttonsArr[i] || event.target.value);
      showCurrentWeather(event.target.value); //run function to show today's weather
      // renderButtons(city);
      fiveDayForecast(event.target.value);
    });
    $("#city-button").append(btn); //add the button to the buttons div
    // var cities = JSON.parse(localStorage.getItem("city")) || [];

    //SOMEHOW NEED TO APPEND THE CHOICE OF THE USER STORED IN THE ARRAY TO THE PAGE.
  }
}

// ==================================================================================================================================================================
