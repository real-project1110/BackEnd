const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const PostController = require('../controllers/posts.controller');
const postController = new PostController();

router.post('/:groupId', auth, postController.createPost);
router.get('/:groupId/posts', auth, postController.findAllPost);
router.get('/posts/:postId', auth, postController.findPost);
router.put('/posts/:postId', auth, postController.updatPost);
router.delete('/posts/:postId', auth, postController.deletPost);

module.exports = router;
