const {Post} = require("../models/post")
const {Source} = require("../models/source");
const {Channel} = require('../models/channel')
const {publicationPostsRequest} = require("../api/InteractionTelegram");
const {Weather} = require("../models/weather");


module.exports.addPost = async function (req, res) {
    req.body.map(item => {
            const addPost = async (channel_id) =>
                await Post.create({
                    "source": item.source,
                    "url": item.url,
                    "title": item.title,
                    "description": item.description,
                    "date": item.date,
                    "image": item.image,
                    "meta": null,
                    "channel_id": channel_id.channelId[0].channel_id,
                    "rating": 1
                })

            getChannelId(item.source).then(channel_id => {
                addPost(channel_id)
                    .catch(err => {
                    })
            })
        }
    )
    res.send("ok")
}

module.exports.getPostsAll = async function (req, res) {
    Post.findAll({raw: true}).then(posts => {
        res.json(posts);
    }).catch(err => console.log(err));
}


module.exports.updateStatusPost = async function (req, res) {
    const {post_id: PostId} = req['params']
    Post.update({
        status: "rejected"
    }, {
        where: {
            id: PostId
        }
    }).then(res.send("ok"))
}


module.exports.getPostsNoUpdateStatus = async function (req, res) {
    const {params} = req;
    const {channel_id: channelId} = params
    const countPosts = await Channel.findOne({where: {channel_id: channelId}, attributes: ["count_posts"]})

    Post.findAll({
        where: {
            channel_id: channelId,
            status: "no public"
        },
        order: [['date', 'DESC'], ['rating', 'DESC']],
        limit: countPosts.count_posts
    }).then(posts => {
        res.status(200).json(posts);
    }).catch(err => console.log(err));
}

module.exports.updateStatusPosts = async function (listPosts) {
    listPosts.map(item => {
        Post.update({
            status: "public"
        }, {
            where: {
                id: item.id
            },
        })
    })
}

const getChannelId = async function (hash) {
    let cityId
    let channelId

    cityId = await Source.findOne({where: {hash: hash}, attributes: ["city_id"]})
    channelId = await Channel.findAll({where: {city_id: cityId.city_id, status: "main"}, attributes: ["channel_id"]})

    return {channelId}
}


module.exports.publishingPosts = async function () {
    const listChannel = await Channel.findAll({raw: true, where: {status: "main"}})
    listChannel.map(async (channel) => {
        const {dataValues: weather} = (await Weather.findOne({
            where: {city_id: channel.city_id, today: false}
        }))
        Post.findAll({
            raw: true,
            where: {
                channel_id: channel.channel_id,
                status: "no public"
            },
            order: [['date', 'DESC'], ['rating', 'DESC']],
            limit: channel.count_posts
        }).then(posts => {
            publicationPostsRequest({
                token_bot: "",
                weather_bot_url: channel.url_bot_weather,
                weather_image_url: weather.image_url,
                channel_id: channel.channel_id,
                posts: posts
            })
        })
    })
}
