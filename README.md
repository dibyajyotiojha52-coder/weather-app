# Weather App (Mini Project)

A modern, responsive weather forecast web app built with HTML, CSS, JavaScript, Chart.js, and Leaflet map integration.

## 🚀 Features

- Search weather by city name (via WeatherAPI)
- Display current weather details:
  - Temperature (°C)
  - Condition
  - Humidity
  - Wind speed
  - Air quality (PM2.5)
- Interactive chart (Chart.js) for core weather metrics
- Location map (Leaflet + OpenStreetMap)
- "Use My Location" geolocation support
- "View on Google Maps" button for route & details
- Dark mode toggle with localStorage persistence
- Responsive and professional UI with mobile support
- Error handling for API issues and invalid input

## 🛠️ Tech Stack

- HTML5
- CSS3 (Responsive + dark mode)
- JavaScript (ES6)
- Chart.js (data visualization)
- Leaflet (interactive map)
- WeatherAPI (current weather data)

## 🔧 Setup

1. Clone this repo:

```bash
git clone https://github.com/<your-username>/weather-app.git
cd weather-app
```

2. Open `index.html` in your browser (or use Live Server extension in VS Code)

3. Enter a city and click `Search`, or click `Use My Location`.

## 📡 Configuration

WeatherAPI key is currently set in `script.js`:

```js
const apiKey = '88ffe77242d94a859f1182745260304';
```

If needed, replace with your own WeatherAPI key.

## 🗺️ Notes

- Embedded map uses Leaflet + OpenStreetMap (no API key needed)
- Google Maps button opens the location in Google Maps separately

## 📝 Project Flow

1. User enters city or uses current location.
2. App calls WeatherAPI to fetch current data.
3. UI updates with weather info, chart, and map marker.
4. User can switch themes and save preference.

## 📁 Files

- `index.html` - app structure
- `styles.css` - styling
- `script.js` - app logic
- `README.md` - docs

 
