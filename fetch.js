

/////////////////////////////////////////////////////
//elements for the main weather for the day
var weatherCityInfo = document.querySelector('#city');
var cityTemperature = document.querySelector('#temp');
var cityDescription = document.querySelector("#description")
var cityHumidity = document.querySelector("#humidity")
var fetchButton = document.getElementById('button-addon1');
var uvIndex = document.querySelector("#uvi")
///////////////////////////////////////////////////////
var firstForcastDate = document.querySelector("#date1")
var firstForcastTemp = document.querySelector("#temp2")
var firstForcastWindspeed = document.querySelector("#windspeed2")
var firstForcastDateHumidity = document.querySelector("#humidity2")



var inputValue = window.document.getElementById("#button-addon1")
fetchButton.addEventListener('click', saveInput);

function saveInput(){
    var input = document.querySelector('#firstInput').value
        window.localStorage.setItem("citysearched", input);
    getApi()
}

function getApi() {
    var cityFromLocalStorage = window.localStorage.getItem("citysearched")

  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityFromLocalStorage+'&units=imperial&appid=e724ba8d68a039f0c9e73328553900ef';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
weatherCityInfo.textContent = data.name+' '+moment().format('l')
cityTemperature.textContent = "Temperature: "+data.main.temp+"\u2109"
cityDescription.textContent="Wind speed: "+data.wind.speed+ " MPH"
cityHumidity.textContent="Humidity: "+data.main.humidity+"%"

var coordinateLat = data.coord.lat
var coordinateLon = data.coord.lon

 window.localStorage.setItem("latitude",coordinateLat)
 window.localStorage.setItem("longitude",coordinateLon)


 getApi2();
    });
}



function getApi2() {
  var getLatitude = window.localStorage.getItem("latitude")
  var getLongitude = window.localStorage.getItem("longitude")

var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+getLatitude+'&lon='+getLongitude+'&exclude=hourly,daily&appid=e724ba8d68a039f0c9e73328553900ef';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
  uvIndex.textContent= "UVI: "+ data.current.uvi
  getFiveDayForecast();

  });
}
function getFiveDayForecast() {
  var getLatitude = window.localStorage.getItem("latitude")
  var getLongitude = window.localStorage.getItem("longitude")

var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+getLatitude+'&lon='+getLongitude+'&units=imperial&appid=e724ba8d68a039f0c9e73328553900ef';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)

    console.log()
    console.log(data.list[2].dt_txt)
    firstForcastDate.textContent=data.list[2].dt_txt
    firstForcastTemp.textContent="Temperature: "+data.list[2].main.temp+"\u2109"
    firstForcastWindspeed.textContent="Windspeed: "+data.list[2].wind.speed
    firstForcastDateHumidity.textContent="Humidity: "+data.list[2].main.humidity+"%"

  });
}






