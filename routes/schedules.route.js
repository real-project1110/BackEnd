const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const ScheduleController = require('../controllers/schedules.controller');
const scheduleController = new ScheduleController();

router.post('/:groupId', auth, scheduleController.createSchedule);

router.get('/:groupId', auth, scheduleController.findAllSchedule);

router.put('/:scheduleId', auth, scheduleController.updateSchedule);

router.delete('/:scheduleId', auth, scheduleController.destroySchedule);

module.exports = router;
