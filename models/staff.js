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
    },
    is_deleted: {
        type: String,
        enum: ['0', '1']
    }
})

const Staff = mongoose.model("staff", StaffSchema)

module.exports = Staff