const fs = require('fs')
const Attendance = require('../models/attendance')
const moment = require('moment/moment')

module.exports = {
    getAttendance: async (req, res) => {
        const attend = await Attendance.find({}).populate('id_user')
        res.send(attend)
    },
    getAttendanceById: async (req, res) => {
        const attend = await Attendance.find({ id_user: req.user._id })
        res.status(200).send({
            status: true,
            data: attend
        })
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
    },
    clock_out: async (req, res) => {
        const { clock_out } = req.body
        try {
            let date = moment().format("YYYY-MM-DD")
            const find = await Attendance.findOne({ id_user: req.user._id, date })
            const startTime = moment(find.clock_in)
            const endTime = moment(clock_out)
            let totalSec = endTime.diff(startTime, 'seconds')
            const total_hours = moment().startOf('day').seconds(totalSec).format('H:mm')

            const attend = await Attendance.findOneAndUpdate(
                { id_user: req.user._id, date },
                {
                    clock_out,
                    totalhours: total_hours,
                }
            )
            await attend.save()
            res.status(200).send({
                status: true,
                message: 'berhasil clock out!'
            })
        } catch (error) {
            console.log(error);
        }

    },
    cekAttendance: async (req, res) => {
        let date = moment().format("YYYY-MM-DD")
        const attend = await Attendance.find({ id_user: req.user._id, date })
        if (attend.length == 1 && attend[0].clock_in && attend[0].clock_out) {
            return res.status(200).send({
                status: true,
                clock_in: 1,
                clock_out: 1,
            })
        }
        else
            if (attend.length == 1 && attend[0].clock_out == null) {
                return res.status(200).send({
                    status: true,
                    clock_in: 0,
                    clock_out: 1,
                })

            } else {
                return res.status(200).send({
                    status: true,
                    clock_in: 1,
                    clock_out: 0,
                })
            }
    }
}