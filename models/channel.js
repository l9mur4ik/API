const Sequelize = require("sequelize")
const db = require("../config/database")

const Channel = db.define("channel", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    channel_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    channel_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    city_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    count_posts: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 10
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "main"
    },
    url_bot_weather: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    channel_url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    }
})


module.exports.Channel = Channel
