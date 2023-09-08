//on click function to start. once user enters city name. that search starts the function and goes thru the api

//function was not working till domcontentloaded was added. by doing this html now loads first and allows function to run properly
document.addEventListener("DOMContentLoaded", function() {
var start = document.getElementById("search-city");
displaySearchHistory();
start.addEventListener("submit", searchCity);});

function searchCity(event) {
  event.preventDefault();
  var cityName = document.getElementById("city-name").value;

  addToSearchHistory(cityName);

  getCoordinates(cityName)
}

function getCoordinates(cityName) {
  var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}+&appid=3acfc9fd412f80b4906c54517b3712a3`;
  return fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function(data){
        //console log confirms that lat and lon are coming up when city is entered
        //switched console log below to declare var for function above, but I believe they would not get read from here?
        getForecast(data[0].lat, data[0].lon)
    });}

//updated order of functions here. first get the Coordinates, then plug those in to getforecast. API is still not working, so will need to go back and test

function getForecast(lat,lon){
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=3acfc9fd412f80b4906c54517b3712a3`;
    return fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
          displayForecast(data)
        })
    }

    //dom manipulation now works and both searched city and forecast display
function displayForecast(data){
  console.log(data)
  var weatherContainer = document.getElementById("forecast");
  var currentWeather = document.getElementById("weather");
  var forecastData = data.list
  weatherContainer.innerHTML=""
var startIndex = 0
//iterate through forecastData to find when the date is not today, and set startIndex = the index we found is the following day
//we want o make sure we're not in today

//below is the updated html for the current weather. followed by the loop which runs to grab the weather for the following 5 days. done in increments of 8
//as the API displays every 3 hours
currentWeather.innerHTML= `
<h2>Current Weather in ${data.city.name}</h2>
<p>Temp: ${data.list[0].main.temp}° F</p>
<p>Winds: ${data.list[0].wind.speed} mph</p>
<p>Humidity: ${data.list[0].main.humidity}%</p>`;

for (let i = startIndex; i < forecastData.length; i+=8) {
  
  weatherContainer.innerHTML += `<div class="card">
  <div class="card-body">
    <h5 class="card-title">${formatDate(forecastData[i].dt_txt)}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Temp: ${forecastData[i].main.temp}° F</h6>
    <h6 class="card-subtitle mb-2 text-muted">Wind Speed: ${forecastData[i].wind.speed} mph</h6>
    <h6 class="card-subtitle mb-2 text-muted">Humdity: ${forecastData[i].main.humidity}%</h6>
  </div>
</div>`
}
}

function formatDate(date){
var formattedDate =  date.split(' ')
console.log(formattedDate)
return formattedDate[0]
}



   //send users search to local storage 
   function addToSearchHistory(cityName) {
      var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];
      if(citySearches.includes(cityName)){
        return
      }
      citySearches.push(cityName);
      if(citySearches.length > 5){
        citySearches.shift()
      }
      localStorage.setItem("citySearches", JSON.stringify(citySearches));
      displaySearchHistory()
    }

    //display the searches in the side bar under search history
    //THIS IS NOT WORKING AND WHERE I AM STUCK. SEARCH CITIES WONT DISPLAY (this works now after adding domcontent loaded above)
    function displaySearchHistory() {
      var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];
      var searchHistoryDiv = document.getElementById("search-history");
      searchHistoryDiv.innerHTML = "<h3>Search History</h3>";


      //this function should look thru all searches and adds element/makes it clickable
      citySearches.forEach(function (city) {
        var cityDiv = document.createElement("div");
        var cityButton = document.createElement("a");
        cityButton.href = "#";
        cityButton.textContent = city;
        

        //function which takes the clicked on city from local storage and runs it thru forecast function
        cityButton.addEventListener("click", function () {
          getCoordinates(city)
      });
        cityDiv.appendChild(cityButton);
        searchHistoryDiv.appendChild(cityDiv); 
      });
    }

    //function now works and pulls up temperature. need to adjust api link so that it displays in F

//         //if no coordinates come back
//         return out of this function and aler the user (Enter valid city)
//         saveToLocalStorage(newCity)
//         get coordinates
//         getForecast(latitue,longitude)
//     }

//     function saveToLocalStorage(newCityObject){
//         // we only have one key, but we save an ARRAY
//         // PARSE the local storage
//         // check if It's in the array
//         // remove older array entries to controll length
//         // save by Stringifying modified array
//         loadLocalStorage()
//     }

//     function handleFormSubmit(event){
//         event.preventDefault()
//         //

//         #city
//         getCoordinates(city)
//     }

//     document.getElementById("city-search").addEventListener("submit", handleFormSubmit)

//     function loadLocalStorage(){
// //when page is started, use key from saved localstorage to populate array

// //cleanup your mess before you make more
// //emptying serarch history list, then populating

// //parse array into list items on lefthand side (#search-history-list)
// //on click of any array items, run function to getCoordinates

// }

//     loadLocalStorage
