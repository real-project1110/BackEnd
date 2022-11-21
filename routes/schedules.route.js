const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const ScheduleController = require('../controllers/schedules.controller')
const scheduleController = new ScheduleController();

router.post('/:groupId',scheduleController.createSchedule)

router.get('/:groupId',scheduleController.findAllSchedule)

router.put('/:scheduleId',scheduleController.updateSchedule)

router.delete('/:scheduleId',scheduleController.destroySchedule)

router.get('/:groupId/:scheduleId',scheduleController.findOneSchedule)


module.exports = router;