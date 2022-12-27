const express = require('express')

const controller = require('../controllers/staff')

const router = express.Router()

router.post('/create-account', controller.createAccount)
router.get('/staff', controller.getAllStaff)

module.exports = router