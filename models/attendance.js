const { Schema, model } = require("mongoose")
import Double from '@mongoosejs/double';

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
        type: Double
    },
    longitude: {
        type: Double
    },
    totalhours: {
        type: Date
    }
})

const Attendance = model("attendance", AttendanceSchema)

module.exports = Attendance