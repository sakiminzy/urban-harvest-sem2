const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
};

export function getWeatherLabel(code) {
  return weatherCodeMap[code] || "Conditions changing";
}

export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min",
    forecast_days: "1",
    timezone: "auto",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Unable to load the weather forecast right now.");
  }

  const data = await response.json();

  return {
    temperature: data.current?.temperature_2m,
    windSpeed: data.current?.wind_speed_10m,
    weatherCode: data.current?.weather_code,
    summary: getWeatherLabel(data.current?.weather_code),
    maxTemperature: data.daily?.temperature_2m_max?.[0],
    minTemperature: data.daily?.temperature_2m_min?.[0],
  };
}
