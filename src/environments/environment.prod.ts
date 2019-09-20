export const environment = {
  production: true,
  weatherApi: {
    apiKey: '106ca53e813644cab8c4fd0dfab38d42',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
    resources: {
      currentWeatherSingleCity: 'weather',
      currentWeatherGroup: 'group',
      fiveDayForecast: 'forecast'
    }
  }
};
