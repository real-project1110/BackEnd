const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const ScheduleController = require('../controllers/schedules.controller')
const scheduleController = new ScheduleController();

router.post('/:groupId',auth,scheduleController.createSchedule)

router.get('/:groupId',auth,scheduleController.findAllSchedule)

router.put('/:groupId/:id',auth,scheduleController.updateSchedule)

router.delete('/:groupId/:id',auth,scheduleController.destroySchedule)

router.get('/:groupId/:id',auth,scheduleController.findOneSchedule)


module.exports = router;