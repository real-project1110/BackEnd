const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const ScheduleController = require('../controllers/schedules.controller')
const scheduleController = new ScheduleController();

router.post('/',scheduleController.createSchedule)


module.exports = router;