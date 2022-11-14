const CommentService = require('../services/comments.service');
const InvalidParamsError = require('../exceptions/index.exception');

class CommentController {
  commentService = new CommentService();

  //*댓글 작성
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { comment } = req.body;
      if (!postId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const createComment = await this.commentService.createComment({
        postId,
        userId,
        comment,
      });
      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = CommentController;
