const fs = require('fs')
const Attendance = require('../models/attendance')
const moment = require('moment/moment')

function timetoseconds(time) {
    return parseInt(time.substr(0, 2)) * 3600 + parseInt(time.substr(3, 5)) * 60 + parseInt(time.substr(6, 8));
}
function secondstotime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var secondss = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (secondss < 10) { secondss = "0" + secondss; }
    return hours + ':' + minutes + ':' + secondss;
}
function getTime(days = 0, format = "Y-m-d H:i:s") {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let dates = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    var date_time;
    if (format == "Y-m-d H:i:s") {
        date_time = year + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
    } else if (format == "Y-m-d") {
        date_time = year + "-" + month + "-" + dates;
    } else if (format == "H:i:s") {
        date_time = hours + ":" + minutes + ":" + seconds;
    }
    return date_time;
}
function getStartTime(days = 0, format = "Y-m-d H:i:s") {
    var date = new Date()
    date.setHours(9, 0, 0, 0)
    date.setDate(date.getDate() + days);
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let dates = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    var date_time;
    if (format == "Y-m-d H:i:s") {
        date_time = year + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
    } else if (format == "Y-m-d") {
        date_time = year + "-" + month + "-" + dates;
    } else if (format == "H:i:s") {
        date_time = hours + ":" + minutes + ":" + seconds;
    }
    return date_time;
}
function getlate(days = 0, format = "Y-m-d H:i:s") {
    var date = new Date()
    date.setHours(9, 30, 0, 0)
    date.setDate(date.getDate() + days);
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let dates = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    var date_time;
    if (format == "Y-m-d H:i:s") {
        date_time = year + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
    } else if (format == "Y-m-d") {
        date_time = year + "-" + month + "-" + dates;
    } else if (format == "H:i:s") {
        date_time = hours + ":" + minutes + ":" + seconds;
    }
    return date_time;
}

module.exports = {
    getAttendance: async (req, res) => {
        try {
            const attend = await Attendance.find().populate({
                path: 'id_user',
                populate: {
                    path: 'id_staff',
                    populate: {
                        path: 'id_division',
                        select: 'name'
                    }
                }
            })
            res.status(200).send({
                status: true,
                data: attend
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    getAttendanceById: async (req, res) => {
        const attend = await Attendance.find({ id_user: req.user._id })

        if (attend.length > 0) {
            res.status(200).send({
                status: true,
                data: attend
            })
        } else {
            res.status(200).send({
                status: false,
                message: `you don't have records of your attendance`
            })
        }
    },
    clock_in: async (req, res) => {
        const {
            latitude,
            longitude,
        } = req.body
        try {
            let date = moment().format("YYYY-MM-DD")
            const findSameDate = await Attendance.findOne({ date, id_user: req.user._id })
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
                let time = getTime(0, "H:i:s")
                let start = getStartTime(0, "H:i:s")
                let late = getlate(0, "H:i:s")
                console.log(timetoseconds(time), timetoseconds(start), timetoseconds(late));


                if (timetoseconds(time) < (timetoseconds(start) - 600)) {
                    return res.status(400).send({
                        status: false,
                        message: "Anda tidak dapat masuk sekarang! Anda dapat memulai jam masuk 10 menit sebelum " + start
                    });
                } else if (timetoseconds(time) > timetoseconds(late)) {
                    return res.status(400).send({
                        status: false,
                        message: "Maaf Anda masuk lebih dari " + late + " setelah " + start + " ! Jadi kami menganggap Anda sebagai alfa."
                    });
                } else if (timetoseconds(time) >= (timetoseconds(start) - 600) && timetoseconds(time) <= timetoseconds(start)) {
                    const dateString = `${getTime(0, 'Y-m-d')}`
                    const input = time
                    const hours = input.slice(0, 2)
                    const minutes = input.slice(3, 5)
                    const seconds = input.slice(6, 8)
                    const datetime = new Date(dateString)
                    datetime.setHours(hours, minutes, seconds)
                    const attend = new Attendance({
                        id_user: req.user._id,
                        status: "Attend",
                        date: date,
                        latitude,
                        longitude,
                        clock_in: datetime,
                        photo: path,
                    })
                    await attend.save()
                    res.status(200).send({
                        data: attend
                    })
                } else {
                    const dateString = `${getTime(0, 'Y-m-d')}`
                    const input = time
                    const hours = input.slice(0, 2)
                    const minutes = input.slice(3, 5)
                    const seconds = input.slice(6, 8)
                    const datetime = new Date(dateString)
                    datetime.setHours(hours, minutes, seconds)
                    const attend = new Attendance({
                        id_user: req.user._id,
                        status: "Late",
                        date: date,
                        latitude,
                        longitude,
                        clock_in: datetime,
                        photo: path,
                    })
                    await attend.save()
                    res.status(200).send({
                        data: attend
                    })
                }
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