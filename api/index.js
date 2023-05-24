const axios = require('axios')
const config = require('../config/api.config')

const weather = axios.create({
    baseURL: config.url_api_weather
})

const getWeatherRequest = async (cityName) => {
    const result = await weather.get(`forecast`, {
        params: {
            q: cityName,
            appid: config.appid_api_weather,
            lang: "ru",
            units: "metric"
        }
    })
    return result.data
}



module.exports = {
    getWeatherRequest: getWeatherRequest,
}
