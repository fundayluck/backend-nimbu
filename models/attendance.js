const { Schema, model } = require("mongoose")
const double = require('@mongoosejs/double')

const AttendanceSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: String
    },
    clock_in: {
        type: Date
    },
    clock_out: {
        type: Date
    },
    status: {
        type: String
    },
    latitude: {
        type: double
    },
    longitude: {
        type: double
    },
    totalhours: {
        type: String
    },
    photo: {
        type: String,
    },
})

const Attendance = model("attendance", AttendanceSchema)

module.exports = Attendance