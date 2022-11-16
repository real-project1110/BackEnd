const express = require('express');
const router = express.Router();

router.use('/groups', require('./comments.route'));
router.use('/groups', require('./posts.route'));
router.use('/groups', require('./groups.route'));
router.use('/users', require('./users.route'));

module.exports = router;
