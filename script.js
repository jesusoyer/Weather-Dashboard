var firstSearchedInput = document.querySelector("#firstSearched")
// var fetchButton = document.getElementById('button-addon1');
// fetchButton.addEventListener('click', firstsearchedValue)

function firstsearchedValue(){
var cityFromLocalStorage = window.localStorage.getItem("citysearched")
window.localStorage.setItem("pastCities", storeArray);

var storeArray=[]

storeArray.push(cityFromLocalStorage)
firstSearchedInput.textContent=cityFromLocalStorage
console.log(storeArray)
}
firstsearchedValue();