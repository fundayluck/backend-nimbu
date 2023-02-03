const fs = require('fs')
const Attendance = require('../models/attendance')

module.exports = {
    getAttendance: async (req, res) => {
        const attend = await Attendance.find({}).populate('id_user')
        res.send(attend)
    },
    clock_in: async (req, res) => {
        const {
            date,
            description,
            latitude,
            longitude,
            clock_in
        } = req.body
        try {
            const findSameDate = await Attendance.findOne({ date, id_user: req.user._id })
            console.log(findSameDate);
            if (findSameDate) {
                res.status(400).send({
                    status: false,
                    message: 'Anda sudah Login di hari ini!'
                })
            } else {
                const path = 'staffPicture/' + Date.now() + '.png'
                const imgData = req.body.image
                const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '')
                fs.writeFileSync(path, base64Data, { encoding: 'base64' })

                const attend = new Attendance({
                    id_user: req.user._id,
                    description,
                    date,
                    latitude,
                    longitude,
                    clock_in,
                    photo: path,
                })
                await attend.save()
                res.status(200).send({
                    data: attend
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}