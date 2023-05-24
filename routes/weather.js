const express = require("express")
const router = express.Router()

const controllers = require("../controllers/weather")

router.get("/updateRecording", controllers.updateRecording)

router.get("/getWeather/:weather_hash", controllers.getWeather)

router.get("/savePhotoWeather", controllers.savePhotoWeather)

module.exports = router
