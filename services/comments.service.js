const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');
const ValidationError = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  //*댓글 작성
  createComment = async ({ postId, userId, comment, groupId }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const createComment = await this.commentRepository.createComment({
      postId,
      comment,
      groupUserId: findGroupUserId.groupUserId,
      groupId,
    });
    await this.commentRepository.upCount({ postId });
    return createComment;
  };

  //*댓글 전체 조회

  findAllComment = async ({ postId, userId, groupId }) => {

    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findAllComment = await this.commentRepository.findAllComment({
      postId,
      groupId,
    });
    return findAllComment;
  };

  //*댓글 수정
  updatComment = async ({ commentId, comment, userId, groupId }) => {

    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    if (findGroupUserId.userId !== userId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findComment = await this.commentRepository.findComment({ commentId });
    if (!findComment) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const updatComment = await this.commentRepository.updatComment({
      commentId,
      comment,
      groupUserId: findGroupUserId.groupUserId,
    });
    return updatComment;
  };

  //*댓글 삭제
  deletComment = async ({ commentId, userId, groupId }) => {

    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    if (findGroupUserId.userId !== userId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findComment = await this.commentRepository.findComment({
      commentId,
    });
    if (!findComment) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const deletComment = await this.commentRepository.deletComment({
      commentId,
      groupUserId: findGroupUserId.groupUserId,
    });
    await this.commentRepository.downCount({ postId: findComment.postId });
    return deletComment;
  };
}
module.exports = CommentService;
