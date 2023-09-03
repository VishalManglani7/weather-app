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
    .then(function (coordinates) {
      return getForecast(coordinates.lat, coordinates.lon);})
    .then(function(forecast){
      displayWeather(cityName, forecast);
    });}

function getCoordinates(cityName) {
  var requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=3acfc9fd412f80b4906c54517b3712a3`;
  return fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function(data){
        //console log confirms that lat and lon are coming up when city is entered
        //switched console log below to declare var for function above, but I believe they would not get read from here?
        var coordinates = { lat: data[0].lat, lon: data[0].lon };
        return {lat: data[0].lat, lon: data[0].lon};
    });}

//updated order of functions here. first get the Coordinates, then plug those in to getforecast. API is still not working, so will need to go back and test

function getForecast(lat,lon){
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3acfc9fd412f80b4906c54517b3712a3`;
    return fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
          var temp = data.list[0].main.temp;
           return {temp: data.list[0].main.temp};
        })
    }

    //dom manipulation now works and both searched city and forecast display
function displayWeather(cityName, forecast){
  var weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = '';
  var header = document.createElement("h2");
  header.textContent = "Weather for " + cityName;
    weatherContainer.appendChild(header);
    var tempDisplay = document.createElement("h3");
    tempDisplay.textContent = "Current temperature: " + forecast.temp
    weatherContainer.appendChild(tempDisplay);}



   //send users search to local storage 
    var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];
    function addToSearchHistory(cityName) {
      citySearches.push(cityName);
      localStorage.setItem("citySearches", JSON.stringify(citySearches));
    }

    //display the searches in the side bar under search history
    //THIS IS NOT WORKING AND WHERE I AM STUCK. SEARCH CITIES WONT DISPLAY (this works now after adding domcontent loaded above)
    function displaySearchHistory() {
      var searchHistoryDiv = document.getElementById("search-history");
      searchHistoryDiv.innerHTML = "";


      //this function should look thru all searches and adds element/makes it clickable
      citySearches.forEach(function (city) {
        var cityButton = document.createElement("a");
        cityButton.href = "#";
        cityButton.textContent = city;
        

        //function which takes the clicked on city from local storage and runs it thru forecast function
        cityButton.addEventListener("click", function () {
          getCoordinates(city).then(function (coordinates) {
            return getForecast(coordinates.lat, coordinates.lon);
          }).then(function (forecast) {
            displayWeather(city, forecast);
          });

      });
        searchHistoryDiv.appendChild(cityButton);
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
