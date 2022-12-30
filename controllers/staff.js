const Staff = require('../models/staff')
const division = require('../models/division')
module.exports = {
    createAccount: async (req, res) => {
        const {
            name,
            phone,
            address,
            photo,
            NIK,
            _id
        } = req.body
        const findDivision = await division.findById(req.body.id_division)
        try {
            const staff = new Staff({
                _id,
                id_division: findDivision,
                name,
                phone,
                address,
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
        res.status(200).send(staff)
    }
}