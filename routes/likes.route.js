const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const LikeController = require('../controllers/likes.controller');
const likeController = new LikeController();

router.put('/:groupId/posts/:postId/likes', auth,likeController.updateLike)

module.exports = router