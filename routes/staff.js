const express = require('express')
const auth = require('../middlewares/requiredAuth')

const controller = require('../controllers/staff')

const router = express.Router()

router.use(auth)
router.post('/create-account', controller.createAccount)
router.get('/staff', controller.getAllStaff)

module.exports = router