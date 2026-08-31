export type WeatherResult = {
  city: string
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  label: string
  icon: string
  advisory: string
}

const describeWeather = (code: number) => {
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' }
  if ([61, 63, 65, 80, 81, 82].includes(code)) return { label: 'Rain', icon: '🌧️' }
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: '🌦️' }
  if ([1, 2, 3, 45, 48].includes(code)) return { label: 'Cloudy', icon: '☁️' }
  return { label: 'Clear', icon: '☀️' }
}

const getAdvisory = (code: number, temperature: number, windSpeed: number) => {
  if ([65, 82, 95, 96, 99].includes(code)) return 'Heavy rain risk: avoid trekking and choose indoor heritage or food experiences.'
  if (temperature >= 34) return 'High temperature: hydrate often and plan activities for morning or evening.'
  if (windSpeed >= 35) return 'Strong wind: use caution around exposed viewpoints and outdoor activities.'
  if (code === 0 || code === 1) return 'Clear conditions support outdoor sightseeing and scenic routes.'
  return 'Mixed conditions: carry a light layer and check local guidance before outdoor plans.'
}

export async function fetchWeather(city: string): Promise<WeatherResult> {
  const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
  if (!geoResponse.ok) throw new Error('Location lookup failed')
  const geo = await geoResponse.json() as { results?: Array<{ latitude: number; longitude: number; name: string }> }
  const match = geo.results?.[0]
  if (!match) throw new Error('Destination not found')

  const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${match.latitude}&longitude=${match.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`)
  if (!weatherResponse.ok) throw new Error('Weather service unavailable')
  const weather = await weatherResponse.json() as { current: { temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number; wind_speed_10m: number; weather_code: number } }
  const description = describeWeather(weather.current.weather_code)
  return {
    city: match.name,
    temperature: weather.current.temperature_2m,
    apparentTemperature: weather.current.apparent_temperature,
    humidity: weather.current.relative_humidity_2m,
    windSpeed: weather.current.wind_speed_10m,
    weatherCode: weather.current.weather_code,
    ...description,
    advisory: getAdvisory(weather.current.weather_code, weather.current.temperature_2m, weather.current.wind_speed_10m),
  }
}
