const express = require('express');
const router = express.Router();

router.use('/users', require('./users.route'));
router.use('/groups', require('./groups.route'));
router.use('/schedules',require('./schedules.route'))
module.exports = router;
