const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { redisGet } = require('../middlewares/cacheMiddleware');
const ScheduleController = require('../controllers/schedules.controller');
const scheduleController = new ScheduleController();
router.post('/:groupId/schedules', auth, scheduleController.createSchedule);

router.get(
  '/:groupId/schedules',
  auth,
  redisGet,
  scheduleController.findAllSchedule,
);

router.put(
  '/:groupId/schedules/:scheduleId',
  auth,
  scheduleController.updateSchedule,
);
router.put(
  '/:groupId/schedules/:scheduleId/drag',
  auth,
  scheduleController.dragUpdateSchedule,
);

router.delete(
  '/:groupId/schedules/:scheduleId',
  auth,
  scheduleController.destroySchedule,
);

module.exports = router;
