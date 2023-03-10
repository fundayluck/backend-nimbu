const express = require("express")
const auth = require('../middlewares/requiredAuth')

const controllerUser = require('../controllers/user')
const controllerStaff = require('../controllers/staff')
const controllerAttendance = require('../controllers/attendance')
const controllerConfig = require('../controllers/config')
const upload = require("../middlewares/upload")


const router = express.Router()

router.post('/login', controllerUser.login)
router.post("/create-user", auth, controllerUser.createUser)
router.get('/user', auth, controllerUser.getAllUser)
router.get('/user/:userId', auth, controllerUser.getUser)
router.post('/create-account', auth, upload.single('image'), controllerStaff.createStaff)
router.get('/staff', auth, controllerStaff.getAllStaff)
router.get('/staff/:staffId', auth, controllerStaff.getStaff)
router.put('/staff/:staffId/edit', auth, controllerStaff.editStaff)
router.get('/nip', auth, controllerStaff.getStaffWithoutAccount)
router.put('/delete/:staffId', auth, controllerStaff.deleteUser)

//attendance
router.post('/attendance/clock_in', auth, upload.single('image'), controllerAttendance.clock_in)
router.post('/attendance/clock_out', auth, upload.single('image'), controllerAttendance.clock_out)
router.get('/attendance', auth, controllerAttendance.getAttendance)
router.get('/cekAttendance', auth, controllerAttendance.cekAttendance)
router.get('/attendancebystaff', auth, controllerAttendance.getAttendanceByStaff)
router.get('/attendancebyid/:attendanceId', auth, controllerAttendance.getAttendanceById)

//config
router.get('/config', auth, controllerConfig.getConfig)
router.put('/edit-config', auth, controllerConfig.updateConfig)

module.exports = router;