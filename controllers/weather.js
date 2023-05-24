const {Weather} = require('../models/weather')
const {City} = require('../models/city')
const {getWeatherRequest} = require("../api");
const puppeteer = require("puppeteer");
const sha256 = require('js-sha256').sha256;

module.exports.updateRecording = async function (req, res) {
    await Weather.destroy({where: {today: true}});
    await Weather.destroy({where: {today: false}});

    const listCity = await City.findAll({where: {timezone: String(0)}, attributes: ["cityName", "id"]})

    listCity.map((city, key) => setTimeout(function () {
        addWeather(city)
        savePhotoWeather()
    }, key * 2000))

    res.send("ok")
}

const addWeather = async function (city) {
    getWeatherRequest(city.cityName).then(weather => {
        Weather.bulkCreate([
            // Погода на текущий день
            {
                "city_id": city.id,
                "weather_night": {
                    temp: Math.round(weather.list[1].main.temp),
                    state: weather.list[1]["weather"][0].description,
                    pressure: Math.round(weather.list[1].main.pressure * 0.750062),
                    humidity: weather.list[1].main.humidity,
                    wind: Math.round(weather.list[1].wind.speed),

                },
                "weather_morning": {
                    temp: Math.round(weather.list[3].main.temp),
                    state: weather.list[3]["weather"][0].description,
                    pressure: Math.round(weather.list[3].main.pressure * 0.750062),
                    humidity: weather.list[3].main.humidity,
                    wind: Math.round(weather.list[3].wind.speed),

                },
                "weather_afternoon": {
                    temp: Math.round(weather.list[5].main.temp),
                    state: weather.list[5]["weather"][0].description,
                    pressure: Math.round(weather.list[5].main.pressure * 0.750062),
                    humidity: weather.list[5].main.humidity,
                    wind: Math.round(weather.list[5].wind.speed),

                },
                "weather_evening": {
                    temp: Math.round(weather.list[7].main.temp),
                    state: weather.list[7]["weather"][0].description,
                    pressure: Math.round(weather.list[7].main.pressure * 0.750062),
                    humidity: weather.list[7].main.humidity,
                    wind: Math.round(weather.list[7].wind.speed),

                },
                "date": weather.list[4]["dt_txt"],
                "hash": sha256("true" + city.id + new Date()),
                "today": true
            },
            // Погода на следующий день
            {
                "city_id": city.id,
                "weather_night": {
                    temp: Math.round(weather.list[9].main.temp),
                    state: weather.list[9]["weather"][0].description,
                    pressure: Math.round(weather.list[9].main.pressure * 0.750062),
                    humidity: weather.list[9].main.humidity,
                    wind: Math.round(weather.list[9].wind.speed),

                },
                "weather_morning": {
                    temp: Math.round(weather.list[11].main.temp),
                    state: weather.list[11]["weather"][0].description,
                    pressure: Math.round(weather.list[11].main.pressure * 0.750062),
                    humidity: weather.list[11].main.humidity,
                    wind: Math.round(weather.list[11].wind.speed),

                },
                "weather_afternoon": {
                    temp: Math.round(weather.list[13].main.temp),
                    state: weather.list[13]["weather"][0].description,
                    pressure: Math.round(weather.list[13].main.pressure * 0.750062),
                    humidity: weather.list[13].main.humidity,
                    wind: Math.round(weather.list[13].wind.speed),

                },
                "weather_evening": {
                    temp: Math.round(weather.list[15].main.temp),
                    state: weather.list[15]["weather"][0].description,
                    pressure: Math.round(weather.list[15].main.pressure * 0.750062),
                    humidity: weather.list[15].main.humidity,
                    wind: Math.round(weather.list[15].wind.speed),

                },
                "date": weather.list[12]["dt_txt"],
                "hash": sha256("false" + city.id + new Date()),
                "today": false
            }
        ])
    })
}

module.exports.getWeather = async function (req, res) {

    const weatherHash = req["params"]["weather_hash"]

    const weather = await Weather.findOne({where: {hash: weatherHash}})

    let days = [' ВОСКРЕСЕНЬЕ',
        ' ПОНЕДЕЛЬНИК',
        ' ВТОРНИК',
        ' СРЕДА',
        ' ЧЕТВЕРГ',
        ' ПЯТНИЦА',
        ' СУББОТА'];

    let month = [' ЯНВАРЯ',
        ' ЯНВАРЯ',
        ' ФЕВРАЛЯ',
        ' МАРТА',
        ' АПРЕЛЯ',
        ' МАЯ',
        ' ИЮНЯ',
        ' ИЮЛЯ',
        ' АВГУСТА',
        ' СЕНТЯБРЯ',
        ' ОКТЯБРЯ',
        ' НОЯБРЯ',
        ' ДЕКАБРЯ',
    ];

    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }

    function getDate(str) {
        const date = new Date(str);
        return date.toLocaleString('ru', options)
    }

    const separator = ''
    let weather_day
    let weather_week
    const date = getDate(weather["date"]).split(separator)

    if (Number(date[0]) === 0) {
        weather_day = date[1]
    } else {
        weather_day = String(date[0]) + String(date[1])
    }

    if (Number(date[3]) === 0) {
        weather_week = month[date[4]]
    } else {
        weather_week = month[String(date[3]) + String(date[4])]
    }

    res.render('index', {
        weather_date: weather_day + weather_week,
        weather_day_of_week: days[(weather["date"]).getDay()],

        weather_night_img: "/images/" + weather["weather_night"].state + ".png",
        weather_night_temp: weather["weather_night"].temp,
        weather_night_state: weather["weather_night"].state,
        weather_night_pressure: weather["weather_night"].pressure,
        weather_night_humidity: weather["weather_night"].humidity,
        weather_night_wind: weather["weather_night"].wind,

        weather_morning_img: "/images/" + weather["weather_morning"].state + ".png",
        weather_morning_temp: weather["weather_morning"].temp,
        weather_morning_state: weather["weather_morning"].state,
        weather_morning_pressure: weather["weather_morning"].pressure,
        weather_morning_humidity: weather["weather_morning"].humidity,
        weather_morning_wind: weather["weather_morning"].wind,

        weather_afternoon_img: "/images/" + weather["weather_afternoon"].state + ".png",
        weather_afternoon_temp: weather["weather_afternoon"].temp,
        weather_afternoon_state: weather["weather_afternoon"].state,
        weather_afternoon_pressure: weather["weather_afternoon"].pressure,
        weather_afternoon_humidity: weather["weather_afternoon"].humidity,
        weather_afternoon_wind: weather["weather_afternoon"].wind,

        weather_evening_img: "/images/" + weather["weather_evening"].state + ".png",
        weather_evening_temp: weather["weather_evening"].temp,
        weather_evening_state: weather["weather_evening"].state,
        weather_evening_pressure: weather["weather_evening"].pressure,
        weather_evening_humidity: weather["weather_evening"].humidity,
        weather_evening_wind: weather["weather_evening"].wind,
    });

}

module.exports.savePhotoWeather = async function (req, res) {

    const weathers = await getDataWeather()

    weathers.map(async weather => {

        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            executablePath: 'C:\\Users\\andre\\Desktop\\chrome.exe'
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1500, height: 900});
        await page.goto('http://localhost:3021/weather/getWeather/' + weather.hash);
        await page.waitForTimeout(1000);
        await page.screenshot({path: `public/weather/${weather.hash}.jpg`});
        await browser.close();

        updateStatusWeather(weather.hash)
    })
    res.send("ok")

}
const savePhotoWeather = async () => {
    const weathers = await getDataWeather()

    weathers.map(async weather => {

        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            executablePath: 'C:\\Users\\andre\\Desktop\\chrome.exe'
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1500, height: 900});
        await page.goto('http://localhost:3021/weather/getWeather/' + weather.hash);
        await page.waitFor(1000);
        await page.screenshot({path: `public/weather/${weather.hash}.jpg`});
        await browser.close();

        updateStatusWeather(weather.hash)
    })

}

const getDataWeather = async () => {
    return await Weather.findAll({where: {status: "waiting"}})
}

const updateStatusWeather = (weatherHash) => {
    Weather.update({
        status: "processed",
        image_url: "http://localhost:3021/weather/" + weatherHash + ".jpg"
    }, {
        where: {
            hash: weatherHash
        },
    })
}

