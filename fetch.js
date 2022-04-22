

/////////////////////////////////////////////////////
//elements for the main weather for the day
var weatherCityInfo = document.querySelector('#city');
var cityTemperature = document.querySelector('#temp');
var cityDescription = document.querySelector("#description")
var cityHumidity = document.querySelector("#humidity")
var fetchButton = document.getElementById('button-addon1');
var uvIndex = document.querySelector("#uvi")
///////////////////////////////////////////////////////
//first forcast date elements
var firstForcastDate = document.querySelector("#date1")
var firstForcastTemp = document.querySelector("#temp2")
var firstForcastWindspeed = document.querySelector("#windspeed2")
var firstForcastDateHumidity = document.querySelector("#humidity2")
///////////////////////////////////////////////////////////////////
//second forecast date elements
var secondForcastDate = document.querySelector("#date2")
var secondForcastTemp = document.querySelector("#temp3")
var secondForcastWindspeed = document.querySelector("#windspeed3")
var secondForcastDateHumidity = document.querySelector("#humidity3")
/////////////////////////////////////////////////////////////////////
// third forecast date elements
var thirdForcastDate = document.querySelector("#date3")
var thirdForcastTemp = document.querySelector("#temp4")
var thirdForcastWindspeed = document.querySelector("#windspeed4")
var thirdForcastDateHumidity = document.querySelector("#humidity4")
////////////////////////////////////////////////////////////////////
// fourth forecast date elements
var fourthForcastDate = document.querySelector("#date4")
var fourthForcastTemp = document.querySelector("#temp5")
var fourthForcastWindspeed = document.querySelector("#windspeed5")
var fourthForcastDateHumidity = document.querySelector("#humidity5")
//////////////////////////////////////////////////////////////////////
// fifth forecast date elements
var fifthForcastDate = document.querySelector("#date5")
var fifthForcastTemp = document.querySelector("#temp6")
var fifthForcastWindspeed = document.querySelector("#windspeed6")
var fifthForcastDateHumidity = document.querySelector("#humidity6")


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
    
    firstForcastDate.textContent=data.list[2].dt_txt
    firstForcastTemp.textContent="Temperature: "+data.list[2].main.temp+"\u2109"
    firstForcastWindspeed.textContent="Windspeed: "+data.list[2].wind.speed
    firstForcastDateHumidity.textContent="Humidity: "+data.list[2].main.humidity+"%"

    secondForcastDate.textContent=data.list[10].dt_txt
    secondForcastTemp.textContent="Temperature: "+data.list[10].main.temp+"\u2109"
    secondForcastWindspeed.textContent="Windspeed: "+data.list[10].wind.speed
    secondForcastDateHumidity.textContent="Humidity: "+data.list[10].main.humidity+"%"
    
    thirdForcastDate.textContent=data.list[18].dt_txt
    thirdForcastTemp.textContent="Temperature: "+data.list[18].main.temp+"\u2109"
    thirdForcastWindspeed.textContent="Windspeed: "+data.list[18].wind.speed
    thirdForcastDateHumidity.textContent="Humidity: "+data.list[18].main.humidity+"%"
    
    fourthForcastDate.textContent=data.list[26].dt_txt
    fourthForcastTemp.textContent="Temperature: "+data.list[26].main.temp+"\u2109"
    fourthForcastWindspeed.textContent="Windspeed: "+data.list[26].wind.speed
    fourthForcastDateHumidity.textContent="Humidity: "+data.list[26].main.humidity+"%"

    fifthForcastDate.textContent=data.list[34].dt_txt
    fifthForcastTemp.textContent="Temperature: "+data.list[34].main.temp+"\u2109"
    fifthForcastWindspeed.textContent="Windspeed: "+data.list[34].wind.speed
    fifthForcastDateHumidity.textContent="Humidity: "+data.list[34].main.humidity+"%"


  });
}






