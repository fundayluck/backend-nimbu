const { Schema, model } = require("mongoose")
import double from '@mongoosejs/double'

const ConfigSchema = new Schema({
    start_working: {
        type: Date
    },
    finish_working: {
        type: Date
    },
    max_dayoff: {
        type: Number
    },
    latitude: {
        type: double
    },
    longitude: {
        type: double
    },
    maxlate: {
        type: Date
    },
})

const Config = model("config", ConfigSchema)

module.exports = Config