const api = {
    key: "b5372fcf13dda1364b6c629b3e8ec6d8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    
    let timestamp = weather.dt;
    let timezone = weather.timezone;
    let unixTimestamp = timestamp + timezone;
    let milliseconds = unixTimestamp * 1000;

    // let now = new Date();
    let dateObject = new Date(milliseconds);


    let date = document.querySelector('.location .date');
    // date.innerText = dateBuilder(now);
    date.innerText = dateBuilder(dateObject);

    let time = document.querySelector('.location .time');
    // time.innerText = timeBuilder(now);
    time.innerText = timeBuilder(dateObject);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let weather_des = document.querySelector('.current .weather-description');
    weather_des.innerText = weather.weather[0].description;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // let day = days[d.getDay()];
    // let date = d.getDate();
    // let month = months[d.getMonth()];
    // let year = d.getFullYear();

    let day = d.toLocaleString("en-GB", {weekday: "long"})
    let date = d.toLocaleString("en-GB", {day: "numeric"})
    let month = d.toLocaleString("en-GB", {month: "long"})
    let year = d.toLocaleString("en-GB", {year: "numeric"})

    return `${day} ${date} ${month} ${year}`;
}

function timeBuilder(d) {
    // let hours = d.getHours();
    // let minutes = `0${d.getMinutes()}`;

    let hours = d.toLocaleString("en-GB", {hour: "numeric"});
    let minutes = d.toLocaleString("en-GB", {minute: "numeric"});
    
    // return `${hours}:${minutes.substr(-2)}`;
    return `${hours}:${minutes}`;
}