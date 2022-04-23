

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
var firstDescription = document.querySelector("#description2")
var firstForcastTemp = document.querySelector("#temp2")
var firstForcastWindspeed = document.querySelector("#windspeed2")
var firstForcastDateHumidity = document.querySelector("#humidity2")
///////////////////////////////////////////////////////////////////
//second forecast date elements
var secondForcastDate = document.querySelector("#date2")
var secondDescription = document.querySelector("#description3")
var secondForcastTemp = document.querySelector("#temp3")
var secondForcastWindspeed = document.querySelector("#windspeed3")
var secondForcastDateHumidity = document.querySelector("#humidity3")
/////////////////////////////////////////////////////////////////////
// third forecast date elements
var thirdForcastDate = document.querySelector("#date3")
var thirdDescription = document.querySelector("#description4")
var thirdForcastTemp = document.querySelector("#temp4")
var thirdForcastWindspeed = document.querySelector("#windspeed4")
var thirdForcastDateHumidity = document.querySelector("#humidity4")
////////////////////////////////////////////////////////////////////
// fourth forecast date elements
var fourthForcastDate = document.querySelector("#date4")
var fourthDescription = document.querySelector("#description5")
var fourthForcastTemp = document.querySelector("#temp5")
var fourthForcastWindspeed = document.querySelector("#windspeed5")
var fourthForcastDateHumidity = document.querySelector("#humidity5")
//////////////////////////////////////////////////////////////////////
// fifth forecast date elements
var fifthForcastDate = document.querySelector("#date5")
var fifthDescription = document.querySelector("#description6")
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
    var wIcon=data.weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon + ".png";
    $('#weatherimage').attr('src', iconurl);

    console.log(data)

weatherCityInfo.textContent = data.name+' ('+moment().format('l')+"): "+ data.weather[0].description.toUpperCase()

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
    var uviData =data.current.uvi
  uvIndex.textContent= "UV Index: "+ uviData

    if(uviData<=2){
      document.getElementById("uvi").style.backgroundColor="lightgreen";
    }else if(uviData>3 && uviData<5){
      document.getElementById("uvi").style.backgroundColor="yellow";
    } else if(uviData>6 && uviData<7){
      document.getElementById("uvi").style.backgroundColor="orange";
    } else if(uviData>8 && uvIndex<10){
      document.getElementById("uvi").style.backgroundColor="red";
    } else if(uviData>11){
      document.getElementById("uvi").style.backgroundColor="violet";
    }

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

    
    var wIcon2=data.list[6].weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon2 + ".png";
    $('#weathericon1').attr('src', iconurl);


    firstForcastDate.textContent=data.list[6].dt_txt
    firstDescription.textContent=data.list[6].weather[0].description.toUpperCase()
    firstForcastTemp.textContent="Temperature: "+data.list[6].main.temp+"\u2109"
    firstForcastWindspeed.textContent="Windspeed: "+data.list[6].wind.speed
    firstForcastDateHumidity.textContent="Humidity: "+data.list[6].main.humidity+"%"


    var wIcon3=data.list[14].weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon3 + ".png";
    $('#weathericon2').attr('src', iconurl);

    secondForcastDate.textContent=data.list[14].dt_txt
    secondDescription.textContent=data.list[14].weather[0].description.toUpperCase()
    secondForcastTemp.textContent="Temperature: "+data.list[14].main.temp+"\u2109"
    secondForcastWindspeed.textContent="Windspeed: "+data.list[14].wind.speed
    secondForcastDateHumidity.textContent="Humidity: "+data.list[14].main.humidity+"%"
    


    var wIcon4=data.list[22].weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon4 + ".png";
    $('#weathericon3').attr('src', iconurl);

    thirdForcastDate.textContent=data.list[22].dt_txt
    thirdDescription.textContent=data.list[22].weather[0].description.toUpperCase()
    thirdForcastTemp.textContent="Temperature: "+data.list[22].main.temp+"\u2109"
    thirdForcastWindspeed.textContent="Windspeed: "+data.list[22].wind.speed
    thirdForcastDateHumidity.textContent="Humidity: "+data.list[22].main.humidity+"%"



    var wIcon5=data.list[30].weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon5 + ".png";
    $('#weathericon4').attr('src', iconurl);
    
    fourthForcastDate.textContent=data.list[30].dt_txt
    fourthDescription.textContent=data.list[30].weather[0].description.toUpperCase()
    fourthForcastTemp.textContent="Temperature: "+data.list[30].main.temp+"\u2109"
    fourthForcastWindspeed.textContent="Windspeed: "+data.list[30].wind.speed
    fourthForcastDateHumidity.textContent="Humidity: "+data.list[30].main.humidity+"%"


    var wIcon6=data.list[38].weather[0].icon
    var iconurl="http://openweathermap.org/img/w/" + wIcon6 + ".png";
    $('#weathericon5').attr('src', iconurl);

    fifthForcastDate.textContent=data.list[38].dt_txt
    fifthDescription.textContent=data.list[38].weather[0].description.toUpperCase()
    fifthForcastTemp.textContent="Temperature: "+data.list[38].main.temp+"\u2109"
    fifthForcastWindspeed.textContent="Windspeed: "+data.list[38].wind.speed
    fifthForcastDateHumidity.textContent="Humidity: "+data.list[38].main.humidity+"%"

    firstsearchedValue();
  });
}






