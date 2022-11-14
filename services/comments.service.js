const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');
const ValidationError = require('../exceptions/index.exception');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  //*댓글 작성
  createComment = async ({ postId, userId, comment }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const createComment = await this.commentRepository.createComment({
      postId,
      comment,
      groupUserId: findGroupUserId.groupUserId,
    });
    return createComment;
  };

  //*댓글 전체 조회
  findAllComment = async (postId, userId) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findAllComment = await this.commentRepository.findAllComment({
      postId,
    });
    return findAllComment;
  };
}
module.exports = CommentService;
