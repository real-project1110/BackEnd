const express = require('express');
const router = express.Router();
// const { get } = require('../middlewares/cacheMiddleware');
const auth = require('../middlewares/authMiddleware');

const CommentController = require('../controllers/comments.controller');
const commentcontroller = new CommentController();

//*댓글 작성
router.post(
  '/:groupId/posts/:postId/comments',
  auth,
  commentcontroller.createComment,
);
//*전체 댓글 조회
router.get(
  '/:groupId/posts/:postId/comments',
  auth,
  // get,
  commentcontroller.findAllComment,
);
//*댓글 수정
router.put(
  '/:groupId/posts/comments/:commentId',
  auth,
  commentcontroller.updatComment,
);
//*댓글 삭제
router.delete(
  '/:groupId/posts/comments/:commentId',
  auth,
  commentcontroller.deletComment,
);

module.exports = router;
