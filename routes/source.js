const express = require("express")
const router = express.Router()
const controller = require('../controllers/source')
const passport = require("passport")

router.get("/all", controller.getAllSource)

module.exports = router
