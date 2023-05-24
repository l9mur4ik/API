const {Weather} = require("../models/weather");
const {Post} = require("../models/post");
const {updateStatusPosts} = require("../controllers/post");
const {telegramPostingRequest} = require("../api/channels");
const {Channel} = require("../models/channel");

module.exports.postingNews = async function () {
    let listChannel = await Channel.findAll({raw: true, where: {status: "main"}})

    listChannel.map(async (item) => {
        const {city_id, count_posts, channel_id, url_bot_weather} = item;
        let {image_url: weather_image_url} = url_bot_weather ?
            (await Weather.findOne({
                raw: true,
                where: {city_id: city_id, today: false},
                attributes: ["image_url"]
            }))
            : {image_url: null}
        let posts = await Post.findAll({
            raw: true,
            where: {
                channel_id: channel_id,
                status: "no public"
            },
            attributes: ["id", "url", "title", "description", "image"],
            order: [['date', 'DESC'], ['rating', 'DESC']],
            limit: count_posts
        })
        telegramPostingRequest({
            "weather_bot_url": url_bot_weather,
            "weather_image_url": weather_image_url,
            "channel_id": channel_id,
            "posts": posts
        })
        updateStatusPosts(posts)
    })
}
