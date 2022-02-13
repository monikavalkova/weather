"use strict";

const api = {
    key: "b16f1d7b649794e913c0ad846411cc3f",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery (event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (response) {
      console.log(response);
      let city = document.querySelector('.location .city');
      city.innerText = `${response.name}, ${response.sys.country}`
      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = buildDate(now);

      let temp = document.querySelector('.current .temp');
      temp.innerHTML = `${Math.round(response.main.temp)}<span>°c<span>`;
      let weather_el = document.querySelector('.current .weather');
      weather_el = response.weather[0].main;
      let weather_range = document.querySelector('.current .hi-low');
      weather_range.innerText = `${Math.round(response.main.temp_min)}°c / ${Math.round(response.main.temp_max)}°c `
}

function buildDate (d) {
    let months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December']
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`
}
