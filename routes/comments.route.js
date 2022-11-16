const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const CommentController = require('../controllers/comments.controller');
const commentcontroller = new CommentController();

router.post('/posts/:postId/comments', auth, commentcontroller.createComment);
router.get('/posts/:postId/comments', auth, commentcontroller.findAllComment);
router.put('/comments/:commentId', auth, commentcontroller.updatComment);
router.delete('/comments/:commentId', auth, commentcontroller.deletComment);

module.exports = router;
