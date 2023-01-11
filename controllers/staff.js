const Staff = require('../models/staff')
const division = require('../models/division')
module.exports = {
    createStaff: async (req, res) => {
        const {
            name,
            phone,
            address,
            birth,
            NIK,
            gender,
            area,
            _id
        } = req.body
        const findDivision = await division.findById(req.body.id_division)
        try {
            const staff = new Staff({
                _id,
                id_division: findDivision,
                name,
                phone,
                birth,
                area,
                address,
                gender,
                photo: req.file.path,
                NIK
            })
            await staff.save()
            res.status(200).send({
                status: true,
                data: staff
            })
        } catch (error) {
            if (error.code === 11000 && error.keyPattern._id === 1) {
                return res.status(422).send({
                    status: false,
                    message: 'User id already exist!'
                })
            }
            return res.status(422).send({
                status: false,
                message: error.message
            });
        }

    },
    getAllStaff: async (req, res) => {
        const staff = await Staff.find({}).populate('id_division')
        if (staff.length === 0) {
            res.status(404).send({
                status: false,
                data: 'no data available'
            })
        } else {
            res.status(200).send({
                status: true,
                data: staff
            })
        }
    },
    getStaff: async (req, res) => {
        const staff = await Staff.find({ _id: req.params.userId }).populate('id_division')
        if (staff.length === 0) {
            res.status(404).send({
                status: false,
                data: 'no data available'
            })
        } else {
            res.status(200).send({
                status: true,
                data: staff
            })
        }
    }
}