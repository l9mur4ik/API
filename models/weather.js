const Sequelize = require("sequelize");
const db = require("../config/database")

const Weather = db.define("weather", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    city_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    weather_night: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    weather_morning: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    weather_afternoon: {
        type: Sequelize.JSON,
        allowNull: true
    },
    weather_evening: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    today: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "waiting"
    },
    date: {
        type: Sequelize.DATE
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
    }
});

//
// db.sync().then(result=>{}).catch(err=> console.log(err));
module.exports.Weather = Weather


