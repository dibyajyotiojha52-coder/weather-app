# Weather App (Mini Project)

A modern, responsive weather forecast web app built with HTML, CSS, JavaScript, Chart.js, and Leaflet map integration.

## 🚀 Features

- Search weather by city name using WeatherAPI
- Current weather details:
  - Temperature (°C)
  - Condition
  - Humidity
  - Wind speed
  - Air quality (PM2.5)
- Interactive Chart.js bar chart of current weather metrics
- 7-day weather forecast with responsive forecast cards
- Location map powered by Leaflet + OpenStreetMap
- "Use My Location" geolocation support
- "View on Google Maps" button for quick map lookup
- Dark mode toggle with localStorage persistence
- Clean, uncluttered UI with mobile-responsive layout
- Error handling for invalid input and API issues

## 🛠️ Tech Stack

- HTML5
- CSS3 (Responsive + dark mode)
- JavaScript (ES6)
- Chart.js (data visualization)
- Leaflet (interactive map)
- WeatherAPI (current weather and forecast)

## 🔧 Setup

1. Clone this repo:

```bash
git clone https://github.com/<your-username>/weather-app.git
cd weather-app
```

2. Open `index.html` in your browser, or use the Live Server extension in VS Code.

3. Enter a city and click `Search`, or click `Use My Location`.

## 📡 Configuration

WeatherAPI key is currently set in `script.js`:

```js
const apiKey = '88ffe77242d94a859f1182745260304';
```

Replace it with your own WeatherAPI key if needed.

## 🗺️ Notes

- The map uses Leaflet + OpenStreetMap, so no map API key is required.
- The Google Maps button opens the current weather location in a separate tab.
- The UI has been streamlined by removing extra time/day controls and brightness sliders.

## 📝 Project Flow

1. User searches for a city or uses geolocation.
2. App fetches weather data from WeatherAPI.
3. UI updates with current weather, a chart, a map marker, and forecast cards.
4. Dark mode preference is saved in localStorage.

## 📁 Files

- `index.html` - app structure
- `styles.css` - styling
- `script.js` - app logic
- `README.md` - documentation

 
