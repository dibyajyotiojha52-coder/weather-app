document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const locationBtn = document.getElementById('location-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const googleMapsBtn = document.getElementById('google-maps-btn');
    const weatherInfo = document.getElementById('weather-info');
    const locationEl = document.getElementById('location');
    const temperatureEl = document.getElementById('temperature');
    const conditionEl = document.getElementById('condition');
    const humidityEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind');
    const aqiEl = document.getElementById('aqi');
    const errorEl = document.getElementById('error');
    const ctx = document.getElementById('weatherChart').getContext('2d');

    let weatherChart;
    let map;
    let marker;
    let currentLat, currentLon;

    initMap();
    updateCurrentDate();

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('darkMode', isDark);
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(`${lat},${lon}`);
                },
                (error) => {
                    showError('Unable to retrieve your location. Please allow location access.');
                }
            );
        } else {
            showError('Geolocation is not supported by this browser.');
        }
    });

    googleMapsBtn.addEventListener('click', () => {
        if (currentLat && currentLon) {
            const url = `https://www.google.com/maps?q=${currentLat},${currentLon}`;
            window.open(url, '_blank');
        }
    });

    function initMap() {
        map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    initMap();

    function updateMap(lat, lon, name) {
        currentLat = lat;
        currentLon = lon;
        if (!map) {
            initMap();
        }
        if (marker) {
            map.removeLayer(marker);
        }
        const position = [lat, lon];
        map.setView(position, 13);
        marker = L.marker(position).addTo(map)
            .bindPopup(`<b>${name}</b><br>Latitude: ${lat.toFixed(4)}<br>Longitude: ${lon.toFixed(4)}`)
            .openPopup();
    }

    function updateCurrentDate() {
        const dateEl = document.getElementById('current-date');
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    async function fetchForecast(lat, lon) {
        const apiKey = '88ffe77242d94a859f1182745260304';
        const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=yes&alerts=no`;

        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            if (response.ok) {
                renderForecast(data.forecast.forecastday);
            }
        } catch (error) {
            console.error('Forecast fetch failed:', error);
        }
    }

    function renderForecast(forecastDays) {
        const cardContainer = document.getElementById('forecastCards');
        cardContainer.innerHTML = '';

        forecastDays.forEach(day => {
            const date = new Date(day.date);
            const name = date.toLocaleDateString('en-US', { weekday: 'short' });
            const condition = day.day.condition.text.toLowerCase();
            let className = 'sunny';

            if (condition.includes('rain')) className = 'rainy';
            else if (condition.includes('cloud')) className = 'cloudy';
            else if (condition.includes('storm')) className = 'storm';
            else if (condition.includes('snow')) className = 'snow';

            const card = document.createElement('div');
            card.className = `forecast-card ${className}`;
            card.innerHTML = `
                <div class="day-name">${name}</div>
                <div>${day.day.condition.text}</div>
                <div class="temp-range">${day.day.mintemp_c.toFixed(1)}°C / ${day.day.maxtemp_c.toFixed(1)}°C</div>
            `;
            cardContainer.appendChild(card);
        });
    }

    async function fetchWeather(query) {
        const apiKey = '88ffe77242d94a859f1182745260304';
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                displayWeather(data);
                createChart(data);
                updateMap(data.location.lat, data.location.lon, data.location.name);
                updateCurrentDate();
                fetchForecast(data.location.lat, data.location.lon);
                weatherInfo.classList.remove('hidden');
                errorEl.classList.add('hidden');
            } else {
                showError(data.error.message);
            }
        } catch (error) {
            showError('Failed to fetch weather data. Please try again.');
        }
    }

    function displayWeather(data) {
        const location = data.location;
        const current = data.current;

        locationEl.textContent = `${location.name}, ${location.region}, ${location.country}`;
        temperatureEl.textContent = `${current.temp_c}°C`;
        conditionEl.textContent = current.condition.text;
        humidityEl.textContent = current.humidity;
        windEl.textContent = current.wind_kph;
        aqiEl.textContent = current.air_quality.pm2_5.toFixed(2);
    }

    function createChart(data) {
        const current = data.current;

        const labels = ['Temperature (°C)', 'Humidity (%)', 'Wind Speed (km/h)', 'PM2.5 (μg/m³)'];
        const values = [
            current.temp_c,
            current.humidity,
            current.wind_kph,
            current.air_quality.pm2_5
        ];

        if (weatherChart) {
            weatherChart.destroy();
        }

        weatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Current Weather Data',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function showError(message) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
});
