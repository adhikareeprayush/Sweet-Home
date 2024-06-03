document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const nameForm = document.getElementById('nameForm');
    const userNameDisplay = document.getElementById('userName');
    const background = document.getElementById('blurryBack');
    const google_search_form = document.getElementById('google_search_form');
    const google_search_input = document.getElementById('google_search_input');

    // Load the stored name on page load
    const storedName = localStorage.getItem('name');
    if (storedName) {
        userNameDisplay.textContent = storedName;
        nameInput.value = storedName;
    }

    // Save the name to local storage and update the display
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        localStorage.setItem('name', name);
        userNameDisplay.textContent = name;
        alert('Name saved successfully!');
    });

    // Show and hide settings menu
    document.getElementById('settings').addEventListener('click', () => {
        document.getElementById('settings_menu').style.display = 'block';
    });

    document.querySelector('.settings_header img').addEventListener('click', () => {
        document.getElementById('settings_menu').style.display = 'none';
    });

    // Load random background image from Unsplash
    function loadImg() {
        const url = `https://api.unsplash.com/photos/random?query=landscape&client_id=gZb-BQbX2-TtxlCJ_jDzH-78EZN-cb8mvSrS9LmWQr8`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let unsplashAuthor = document.getElementById('unsplash-author');
                unsplashAuthor.innerHTML = data.user.name;
                background.style.backgroundImage = `url(${data.urls.regular})`;
            });
    }

    // Get current time and date
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

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        month = months[month];

        let dateElement = document.getElementById('date');
        dateElement.innerHTML = `${days[day]} ${date.getDate()} ${month}`;
    }

    // Display greeting based on time of day
    function greeting() {
        let date = new Date();
        let hours = date.getHours();
        let greetingText = '';

        if (hours < 12) {
            greetingText = 'Good Morning';
        } else if (hours < 18) {
            greetingText = 'Good Afternoon';
        } else {
            greetingText = 'Good Evening';
        }

        const timeGreeting = document.getElementById('timeGreeting');
        timeGreeting.innerHTML = greetingText;
    }

    // Fetch a random quote
    function getQuote() {
        const category = 'happiness';
        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('author');

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
            headers: { 'X-Api-Key': 'R4mo+DRatvAxk/0Y42v3jw==GkmawomWvA4ARIKl' },
            contentType: 'application/json',
            success: function (result) {
                if (result && result.length > 0) {
                    const quote = result[0].quote;
                    const author = result[0].author;
                    if (quote.length > 100) {
                        getQuote();
                    } else {
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

    // Fetch current weather based on geolocation
    function findWeather(latitude, longitude) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d6276de27faacc658b8d1d898f7ed3d0`;
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
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            findWeather(latitude, longitude);
        });
    }

    // Google search form submission
    google_search_form.addEventListener('submit', (e) => {
        e.preventDefault();
        let search_query = google_search_input.value;
        if (search_query === '') return;
        window.open(`https://www.google.com/search?q=${search_query}`, '_blank');
    });

    // Load initial functions
    greeting();
    loadImg();
    getTime_date();
    getQuote();
});
