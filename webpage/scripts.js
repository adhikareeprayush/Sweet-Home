let background = document.getElementById('blurryBack');
function loadImg() {
    // Construct the API URL with the random image endpoint, category query, and your access key
    const url = `https://api.unsplash.com/photos/random?query=landscape&client_id=gZb-BQbX2-TtxlCJ_jDzH-78EZN-cb8mvSrS9LmWQr8`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //get the name of the author
            let unsplashAuthor = document.getElementById('unsplash-author');
            unsplashAuthor.innerHTML = data.user.name;
            background.style.backgroundImage = `url(${data.urls.regular})`;
        });
}

function getTime_date() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    let time = document.getElementById('time');
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    time.innerHTML = `${hours}:${minutes}`;

    //change the date to text form
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    month = months[month];

    let dateElement = document.getElementById('date');
    dateElement.innerHTML = `${days[day]} ${date.getDate()} ${month}`;
}

function greeting() {
    let date = new Date();
    let hours = date.getHours();

    if (hours < 12) {
        greeting.innerHTML = 'Good Morning';
    }
    else if (hours < 18) {
        greeting.innerHTML = 'Good Afternoon';
    }
    else {
        greeting.innerHTML = 'Good Evening';
    }

    const timeGreeting = document.getElementById('timeGreeting');
    timeGreeting.innerHTML = greeting.innerHTML;
}

function getQuote() {
    const category = 'happiness';
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'R4mo+DRatvAxk/0Y42v3jw==GkmawomWvA4ARIKl' }, // Replace 'YOUR_API_KEY' with your actual API key
        contentType: 'application/json',
        success: function (result) {
            if (result && result.length > 0) {
                const quote = result[0].quote;
                const author = result[0].author;
                if (quote.length > 100) {
                    getQuote();
                }
                else {
                    quoteElement.textContent = quote;
                    authorElement.textContent = author;
                }
            } else {
                console.error('No data or empty response from the API.');
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error fetching data:', jqXHR.status, jqXHR.statusText);
        }
    });
}


//get the current laltitude and longitude using geolocation
let latitude, longitude;
function findWeather(laltitude, longitude, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${laltitude}&lon=${longitude}&appid=d6276de27faacc658b8d1d898f7ed3d0`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let weather_desc = document.getElementById('weather_desc');
            let temp = document.getElementById('temp');
            data.main.feels_like = Math.round(data.main.feels_like - 273.15);
            data.weather[0].description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
            weather_desc.innerHTML = data.weather[0].description + ', It is currently ' + data.main.feels_like + '°C.';
            let icon = document.getElementById('weather-icon');
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            temp.innerHTML = data.main.feels_like + '°C';
        });
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        findWeather(latitude, longitude);
    });
}

let google_search_form = document.getElementById('google_search_form');
let google_search_input = document.getElementById('google_search_input');
google_search_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let search_query = google_search_input.value;
    if (search_query === '') return;
    window.open(`https://www.google.com/search?q=${search_query}`, '_blank');
});

window.addEventListener('load', greeting(), loadImg(), getTime_date(), getQuote());
