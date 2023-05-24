const axios = require('axios')
const config = require('../../config/api.config')

const channelCreation = axios.create({
    baseURL: config.url_api_channel_creation
})

const InteractionTelegram = axios.create({
    baseURL: config.url_api_interaction_telegram
})

const checkLinkChannelRequest = async (link) => {
    try {
        const response = await TelegramApiCheck.get(`getChat`, {params: {chat_id: '@' + link}})
        return true
    } catch (err) {
        return false
    }
}

const addSessionRequest = async (number_phone) => {
    return await channelCreation.get(`channel/startSession/${number_phone}`)
}

const sendCodeRequest = async (phone, code, codeHash) =>
    await channelCreation.post(`channel/sendCode`, {
        "phone": phone,
        "code": code,
        "codeHash": codeHash
    })

const createChannelsRequest = async (sessionHash, title, about, username) => {
    return await channelCreation.post(`channel/createChannel`, {
        "sessionHash": sessionHash,
        "title": title,
        "about": about,
        "username": username
    })
}

const getChannelsBySessionRequest = async (sessionHash) => {
    return await channelCreation.post(`channel/getChannelsByPublic`, {"sessionHash": sessionHash})
}

const telegramPostingRequest = (data) =>
    InteractionTelegram.post(`post/publication`, data)


module.exports = {
    addSessionRequest: addSessionRequest,
    sendCodeRequest: sendCodeRequest,
    createChannelsRequest: createChannelsRequest,
    checkLinkChannelRequest: checkLinkChannelRequest,
    getChannelsBySessionRequest: getChannelsBySessionRequest,
    telegramPostingRequest: telegramPostingRequest
}
