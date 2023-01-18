const { Schema, model } = require("mongoose")
import double from '@mongoosejs/double'

const AttendanceSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date
    },
    clock_in: {
        type: Date
    },
    clock_out: {
        type: Date
    },
    description: {
        Type: String
    },
    latitude: {
        type: double
    },
    longitude: {
        type: double
    },
    totalhours: {
        type: Date
    }
})

const Attendance = model("attendance", AttendanceSchema)

module.exports = Attendance