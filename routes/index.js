const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/groups', require('./schedules.route'));
router.use('/groups', require('./comments.route'));
router.use('/groups', require('./posts.route'));
router.use('/groups', require('./groups.route'));
router.use('/users', require('./users.route'));
router.use('/', require('./searches.route'));
router.use('/', require('./kakao.route'));
router.use('/', require('./google.route'));
router.use('/invites', require('./invites.route'));
router.use('/', require('./naver.route'));
router.use('/groups',require('./colors.route'))
router.use('/groups',require('./postlikes.route'))
router.use('/groups',require('./commentlikes.route'))
router.use('/chats',require('./chatting.route'))
module.exports = router;
