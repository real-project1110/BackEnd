const PostRepository = require('../repositories/posts.repository');
const ValidationError = require('../exceptions/index.exception');

class PostService {
  postRepository = new PostRepository();

  //*게시글 작성
  createPost = async ({ groupId, userId, title, content, category }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const post = {
      groupId,
      title,
      content,
      category,
      groupUser: findGroupUserId.groupUserId,
    };
    const createPost = await this.postRepository.createPost({ post });
    return createPost;
  };
  findAllPost = async ({ groupId, category }) => {
    const findAllPost = await this.postRepository.findAllPost({
      groupId,
      category,
    });
    if (!findAllPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    return findAllPost;
  };

  //*게시글 상세 조회
  findPost = async ({ postId }) => {
    const findPost = await this.postRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    return findPost;
  };
}
module.exports = PostService;
