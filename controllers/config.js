const Config = require('../models/config')

module.exports = {
    getConfig: async (req, res) => {
        try {
            const config = await Config.find()
            res.status(200).send({
                status: true,
                data: config
            })
        } catch (error) {
            console.log(error);
        }
    }
}