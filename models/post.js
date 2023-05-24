const Sequelize = require("sequelize");
const db = require("../config/database")

const Post = db.define("post", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        source: {
            type: Sequelize.STRING,
            allowNull: true
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        meta: {
            type: Sequelize.STRING,
            allowNull: true
        },
        channel_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "no public"
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['title', 'channel_id']
            }
        ]
    }
);

//
// db.sync().then(result=>{}).catch(err=> console.log(err));
module.exports.Post = Post
