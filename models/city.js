const Sequelize = require("sequelize");
const db = require("../config/database")

const City = db.define("city", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cityName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cityNameTranslate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    params: {
        type: Sequelize.JSON,
        allowNull: true
    },
    channel_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    timezone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    }

});
//
// db.sync().then(result=>{}).catch(err=> console.log(err));
module.exports.City = City

