const express = require('express');
const router = express.Router();
const passport =require('passport')

router.use('/users', require('./users.route'));
router.use('/groups', require('./groups.route'));




router.use('/', require('./kakao.route'));
module.exports = router;
