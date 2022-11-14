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
      await this.commentService.createComment({
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

  //*댓글 전체 조회
  findAllComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      if (!postId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findAllComment = await this.commentService.findAllComment({
        postId,
        userId,
      });
      res.status(200).json({
        ok: true,
        data: findAllComment,
      });
    } catch (error) {
      next(error);
    }
  };

  //*댓글 수정
  updatComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    if (!commentId || !userId) {
      throw new InvalidParamsError('잘못된 요청입니다.');
    }
    const updatComment = await this.commentService.updatComment({
      commentId,
      comment,
      userId,
    });
    res.status(200).json({
      ok: true,
      data: updatComment,
    });
  };

  //*댓글 삭제
  deletComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    if (!commentId || !userId) {
      throw new InvalidParamsError('잘못된 요청입니다.');
    }
    await this.commentService.deletComment({
      commentId,
      userId,
    });
    res.status(200).json({
      ok: true,
    });
  };
}
module.exports = CommentController;
