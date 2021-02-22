const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1ea65aa0093d75c7a7ff15fdc9beec6b&query=${latitude},${longitude}&units=f`
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to access weather service', undefined)
        } else if (body.error) {
            callback('Unable to access forecast for location. Please Try again', undefined)
        } else {
            const currentWeatherData = body.current
            callback(undefined, `${currentWeatherData.weather_descriptions[0]}. It is ${currentWeatherData.temperature} degrees out there. But it feels like ${currentWeatherData.feelslike} degrees.`)
        }
    })
}

module.exports = forecast