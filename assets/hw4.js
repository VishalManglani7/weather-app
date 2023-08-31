//on click function to start. once user enters city name. that search starts the function and goes thru the api
var API_key = "key"
start.addEventListener("submit", seachCity);

function searchCity(event){
    event.preventDefault();
    var cityName = document.getElementById("city-name").value;

    getCoordinates(cityName);
}
function getForecast(lat,lon){
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${3acfc9fd412f80b4906c54517b3712a3}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
    }

    function getCoordinates(city){
        fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key});
        .then(function(response){
            return response.json();
        }

        .then data
        //if no coordinates come back
        return out of this function and aler the user (Enter valid city)
        saveToLocalStorage(newCity)
        get coordinates  
        getForecast(latitue,longitude)
    }

    function saveToLocalStorage(newCityObject){
        // we only have one key, but we save an ARRAY
        // PARSE the local storage
        // check if It's in the array
        // remove older array entries to controll length
        // save by Stringifying modified array
        loadLocalStorage()
    }

    function handleFormSubmit(event){
        event.preventDefault()
        //

        #city
        getCoordinates(city)
    }

    document.getElementById("city-search").addEventListener("submit", handleFormSubmit)

    function loadLocalStorage(){
//when page is started, use key from saved localstorage to populate array


//cleanup your mess before you make more
//emptying serarch history list, then populating


//parse array into list items on lefthand side (#search-history-list)
//on click of any array items, run function to getCoordinates    

}

    loadLocalStorage()