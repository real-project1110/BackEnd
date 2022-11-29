const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const ScheduleController = require('../controllers/schedules.controller');
const scheduleController = new ScheduleController();
router.post('/:groupId/schedules', auth, scheduleController.createSchedule);

router.get('/:groupId/schedules', auth, scheduleController.findAllSchedule);

router.put(
  '/:groupId/schedules/:scheduleId',
  auth,
  scheduleController.updateSchedule,
);

router.delete(
  '/:groupId/schedules/:scheduleId',
  auth,
  scheduleController.destroySchedule,
);

module.exports = router;
