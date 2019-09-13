/*
                  Node.js Weather Program

         Written by Randall Severy, September 2019
*/

function format_weather_time_data(location,body)
{
  if (isNaN(location)) {
    location += ', ' + body.sys.country
  }
  else {
    location = body.name + ', ' + body.sys.country + ' (' + location + ')'
  }
  console.log('Location: '+location)
  let timezone = body.timezone
  let current_date = new Date()
  timezone += current_date.getTimezoneOffset() * 60
  current_date = new Date(current_date.getTime() + (timezone * 1000))
  console.log('   Current Time: '+current_date.toLocaleString())
  console.log('   Weather: ' + body.weather[0].description)
  console.log('   Temperature: ' + body.main.temp + ' \xB0F')
  console.log('   Humidity: ' + body.main.humidity + '%')
  console.log('   Wind Speed: ' + body.wind.speed + ' mph')
}

function get_weather_time_data(location)
{
  let url = 'https://api.openweathermap.org/data/2.5/weather'
  if (isNaN(location)) {
    url += '?q=' + location
  }
  else {
    url += '?zip=' + location
  }
  url += '&units=imperial&APPID=6370ede8783da5f501d9bfae3621f3c9'
  request(url, { json: true }, function (error, response, body) {
    if (body.cod == 200) {
      format_weather_time_data(location,body)
    }
    else {
      console.log('Error: ' + body.message + ' for location ' + location)
    }
  })
}

const request = require('request')

if (process.argv.length < 3) {
  console.log('Usage:')
  console.log('node weather <city>, <postal code>, ...')
}
else {
  let argStr = process.argv.splice(2).join(' ')
  let args = argStr.split(',')
  for (const arg of args) {
    let location = arg.trim()
    get_weather_time_data(location)
  }
}

