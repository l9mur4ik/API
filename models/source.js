const Sequelize = require("sequelize");
const db = require("../config/database")

const Source = db.define("source", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    href: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    type_source: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    source_status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "empty"
    }
});

module.exports.Source = Source
