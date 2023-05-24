const express = require("express")
const router = express.Router()
const controllers = require("../controllers/channel")

router.get("/all", controllers.getMainChannels)

router.get("/with-sources", controllers.getAllChannelsWithSources)

module.exports = router

