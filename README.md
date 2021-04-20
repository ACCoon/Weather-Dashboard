# Weather-Dashboard
## Description
An application utilizing the OpenWeather API that displays weather and forecast data for cities based on user search.

## Deployment
To view the deployed and current project: https://accoon.github.io/Weather-Dashboard/

## Usage
On loading the page, the application checks for any existing search history in the localstorage from previous use. Otherwise it will load no history.

When the user enters a city name in the search bar, the search will be saved in history and added to a list of previous searches, while fetching and displaying both current weather data and 5-day forecast for the searched city.

When the user clicks on an item in the search history, it will trigger a new fetch with that search and display updated information.