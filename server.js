const express = require("express")
const bodyParser = require('body-parser')
const passport = require("passport")
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const SwaggerOptions = require('./config/swagger.js')
const swaggerSpec = swaggerJsDoc(SwaggerOptions)

const sourceRouter = require("./routes/source")
const postRouter = require("./routes/post")
const channelRouter = require("./routes/channel")
const weatherRouter = require("./routes/weather")

const app = express()

const port = process.env.PORT || 3021

app.use(passport.initialize(undefined))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb'
}))
app.use(cors());
app.set('view engine', 'pug');
app.use(express.static('public'))

app.use("/sources", sourceRouter)
app.use("/post", postRouter)
app.use("/channel", channelRouter)
app.use("/weather", weatherRouter)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
    res.json({
        name: "CityNewsApi",
        status: "Всё ОК!!!!!!",
        date: new Date()
    })
})

app.listen(port);