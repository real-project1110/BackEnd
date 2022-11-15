const express = require('express');
const router = express.Router();

router.use('/users', require('./users.route'));
router.use('/groups', require('./groups.route'));
module.exports = router;
