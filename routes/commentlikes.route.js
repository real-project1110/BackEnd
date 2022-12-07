const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const CommentLikeController = require('../controllers/commentlikes.controller');
const CommentlikeController = new CommentLikeController();

router.put('/:groupId/posts/comments/:commentId/likes',auth,CommentlikeController.updateCommentLike)
module.exports = router