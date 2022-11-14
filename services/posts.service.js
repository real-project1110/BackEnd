const PostRepository = require('../repositories/posts.repository');
const ValidationError = require('../exceptions/index.exception');

class PostService {
  postRepository = new PostRepository();

  //*게시글 작성
  createPost = async ({ groupId, userId, title, content, category }) => {
    const findGroupUserId = await this.PostService.findGroupUserId({ userId });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const post = {
      groupId,
      title,
      content,
      category,
      groupUser: findGroupUserId,
    };
    const createPost = await this.PostService.createPost({ post });
    return createPost;
  };
}
module.exports = PostService;
