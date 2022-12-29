require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    createUsers: async (req, res) => {
        const {
            email,
            password,
            id_staff,
            role
        } = req.body
        const creator = req.user
        try {
            const user = new User({
                email,
                password,
                id_staff,
                role
            })
            if (role === creator.role) {
                res.status(400).send({
                    status: false,
                    message: "HR cannot create another HR"
                })
            } else {
                await user.save()
                res.status(200).send({
                    status: true,
                    data: user
                })
            }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email === 1) {
                return res.status(400).send({
                    status: false,
                    message: 'User email already exist!'
                })
            }
            if (error.code === 11000 && error.keyPattern.id_staff === 1) {
                return res.status(400).send({
                    status: false,
                    message: 'User staff of id already exist!'
                })
            }
            return res.status(400).send({
                status: false,
                message: error.message
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                return res
                    .status(421)
                    .send({
                        status: false,
                        error: "username and password are required"
                    });
            }
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(422).send({
                    status: false,
                    error: "invalid password or email"
                });
            }

            await user.comparePassword(password)
            const token = jwt.sign({ userId: user._id }, SECRET, {
                expiresIn: '1d'
            });
            res.status(200).send({
                status: true,
                token
            });
        } catch (error) {
            return res.status(422).send({
                status: false,
                error: "invalid password or email"
            });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const user = await User.find({}).populate('id_staff').populate()
            res.status(200).send(user)
        } catch (error) {
            console.log(error);
        }
    }
}




