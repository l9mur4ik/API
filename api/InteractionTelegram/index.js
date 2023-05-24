const axios = require('axios')


const InteractionTelegram = axios.create({
    baseURL: "http://localhost:3026/"
})


const publicationPostsRequest = async (dataPublication) => {
    await InteractionTelegram.post(`post/publication`, dataPublication)
}

module.exports = {
    publicationPostsRequest: publicationPostsRequest,
}
