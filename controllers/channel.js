const {Channel} = require('../models/channel')
const {Source} = require("../models/source");


module.exports.getMainChannels = async function (req, res) {
    Channel.findAll({raw: true, where: {status: "main"}}).then(channel => {
        res.status(200).json(
            channel
        )
    }).catch(console.log);
}


module.exports.getAllChannelsWithSources = async function (req, res) {
    const getSourceByChannelId = async (cityId) =>
        await Source.findAll({
            where: {
                city_id: cityId
            }
        })
    const getChannels = async () =>
        await Channel.findAll({raw: true, where: {status: ["main", "training"]}})

    getChannels().then(rar => {
        Promise.all(
            rar.map(channel => getSourceByChannelId(channel.city_id).then((dataSource) => {
                let listErrors = [], listSuccess = [], listEmpty = []
                for (let i = 0; i < dataSource.length; i++) {
                    switch (dataSource[i].source_status) {
                        case 'success':
                            listSuccess.push(dataSource[i].hash)
                            break
                        case 'error':
                            listErrors.push(dataSource[i].hash)
                            break
                        case 'empty':
                            listEmpty.push(dataSource[i].hash)
                            break
                    }
                }
                return {
                    ...channel,
                    listSuccess,
                    listErrors,
                    listEmpty
                }
            })))
            .then(responses => res.status(200).json(responses))
    })
}