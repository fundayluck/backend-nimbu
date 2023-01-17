require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = process.env

module.exports = {
    createUser: async (req, res) => {
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
            if (role === 'HR' && creator.role === 'HR') {
                res.status(400).send({
                    status: false,
                    message: "HR cannot create another HR"
                })
            } else if (creator.role === "STAFF") {
                res.status(400).send({
                    status: false,
                    message: "staff cannot create user"
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
            } else if (!user.is_active) {
                return res.status(422).send({
                    status: false,
                    error: 'This account no longer has login access!'
                })
            }
            await user.comparePassword(password)
            const accessToken = jwt.sign(
                { userId: user._id },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.status(200).send({
                status: true,
                token: accessToken,
                user: {
                    email: user.email,
                    role: user.role
                }
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
            const user = await User.find({}).populate('id_staff')
            res.status(200).send({
                status: true,
                data: user
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('id_staff')
            res.status(200).send({
                status: 'success',
                data: user
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
    }
}




