const {Source} = require('../models/source')
const {City} = require('../models/city')

module.exports.getAllSource = async function (req, res) {
    const getSourceByCityId = async (cityId) =>
        await Source.findAll({
            where: {
                city_id: cityId
            }
        })

    const getCitiesAll = async () =>
        await City.findAll({raw: true, where: {status: "works"}})

    getCitiesAll().then(city => {
        Promise.all(
            city.map(item => getSourceByCityId(item.id).then(data => {
                return {
                    city: item,
                    source: data
                }
            })))
            .then(responses => res.status(200).json(responses))
    })
}
