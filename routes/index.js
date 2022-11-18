const express = require('express');
const router = express.Router();
const passport =require('passport')

router.use('/groups', require('./comments.route'));
router.use('/groups', require('./posts.route'));
router.use('/groups', require('./groups.route'));
router.use('/users', require('./users.route'));
router.use('/', require('./searches.route'));
router.use('/', require('./kakao.route'));

module.exports = router;
