document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
});

function fetchWeather() {
    const apiKey = '39118d2fb9fc18f735a898398fe6dfa3'; // Your API key
    const cityId = '1863983'; // City ID for Gujo, Japan
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current').textContent = data.weather[0].description;
            document.getElementById('temp').textContent = data.main.temp;
            document.getElementById('windChill').textContent = data.main.feels_like;
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('speed').textContent = data.wind.speed;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}