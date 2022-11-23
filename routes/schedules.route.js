const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const ScheduleController = require('../controllers/schedules.controller')
const scheduleController = new ScheduleController();

router.post('/:groupId',scheduleController.createSchedule)

router.get('/:groupId',scheduleController.findAllSchedule)

router.put('/:groupId/:id',scheduleController.updateSchedule)

router.delete('/:groupId/:id',scheduleController.destroySchedule)

router.get('/:groupId/:id',auth,scheduleController.findOneSchedule)


module.exports = router;