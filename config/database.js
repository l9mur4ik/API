let Sequelize = require("sequelize");
module.exports = new Sequelize("news",
    "news_user",
    "ruof02231310", {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        define: {
            timestamps: false
        },
    });
