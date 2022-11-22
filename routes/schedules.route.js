const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const ScheduleController = require('../controllers/schedules.controller')
const scheduleController = new ScheduleController();

router.post('/:groupId',scheduleController.createSchedule)

router.get('/:groupId',auth,scheduleController.findAllSchedule)

router.put('/:scheduleId',auth,scheduleController.updateSchedule)

router.delete('/:scheduleId',auth,scheduleController.destroySchedule)

router.get('/:groupId/:scheduleId',auth,scheduleController.findOneSchedule)


module.exports = router;