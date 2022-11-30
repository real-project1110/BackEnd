const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const PostLikeController = require('../controllers/postlikes.controller');
const postlikeController = new PostLikeController();

router.put('/:groupId/posts/:postId/likes', auth,postlikeController.updateLike)

module.exports = router