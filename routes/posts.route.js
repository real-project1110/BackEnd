const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const PostController = require('../controllers/posts.controller');
const postController = new PostController();

//*게시글 등록
router.post('/:groupId', auth, postController.createPost);
//*게시글 전체 조회
router.get('/:groupId/posts', auth, postController.findAllPost);
//*게시글 상세 조회
router.get('/posts/:postId', auth, postController.findPost);
//*공지/자유로 등록
router.put('/groups/posts/:postId', auth, postController.updatCategory);
//*게시글 수정
router.put('/posts/:postId', auth, postController.updatPost);
//*게시글 삭제
router.delete('/posts/:postId', auth, postController.deletPost);

module.exports = router;
