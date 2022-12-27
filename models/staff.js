const mongoose = require("mongoose")

const StaffSchema = new mongoose.Schema({
    _id: Number,
    id_division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "division",
    },
    name: {
        type: String,
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        type: String
    },
    NIK: {
        type: String
    }
})

const Staff = mongoose.model("staff", StaffSchema)

module.exports = Staff