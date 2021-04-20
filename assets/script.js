var searchBox = document.querySelector('#searchBox');
var searchForm = document.querySelector('#search');
var history = document.querySelector('#history');
var today = document.querySelector('#today');
var forecast = document.querySelector('#fiveDay');

const apiKey = '2db3a9423ac69ac536e99fac81ac089f';
// var currentTime = moment().format('MM/Do/YY');
var searchHist = JSON.parse(localStorage.getItem("searchHist")) || [];

function renderSearchHist() {
  
}

function handleSearchBtn(event) {
  event.preventDefault();
  let search = searchBox.value.trim();
  var apiURLBase = "https://api.openweathermap.org/data/2.5/";
  var apiIconBase = "http://openweathermap.org/img/w/";

  // Check if search was empty. If so, do nothing.
  if (search.length === 0){
    return;
  } else {

    // Save search to search history and save to localstorage.
    searchHist.push(search);
    localStorage.setItem("searchHist", JSON.stringify(searchHist));
    // Call to render new entry to Search history
    renderSearchHist();

    // Call to API for current weather data
    fetch(`${apiURLBase}weather?q=${search}&appid=${apiKey}&units=imperial`)
      .then(res => {
        return res.json();
      })
      .then( data => {
        let temp = data.main.temp;
        let humid = data.main.humidity;
        let wind = data.wind.speed;
        let icon = data.weather[0].icon;

        today.children[0].children[0].innerHTML = `${search} <img src=${apiIconBase}${icon}.png>`;
        today.children[0].children[1].textContent = `Temperature: ${temp}℉`;
        today.children[0].children[2].textContent = `Humidity: ${humid}%`
        today.children[0].children[3].textContent = `Wind Speed: ${wind} MPH`
      })
      .catch(err => console.log(err));

      // Call to API for forecast weather data
      fetch(`${apiURLBase}forecast?q=${search}&appid=${apiKey}&units=imperial`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          for(let i = 0; i < 5; i++){
            let icon = data.list[i].weather[0].icon;
            let weather = data.list[i].weather[0].main;
            let temp = data.list[i].main.temp;
            let humid = data.list[i].main.humidity;

            forecast.children[i].children[0].children[0].innerHTML = `${weather} <img src=${apiIconBase}${icon}.png>`;
            forecast.children[i].children[0].children[1].textContent = `Temp: ${temp}℉`;
            forecast.children[i].children[0].children[2].textContent = `Humidity: ${humid}%`;
          }
        })
        .catch(err => console.log(err));
  }

}

searchForm.addEventListener("submit", event => handleSearchBtn(event));