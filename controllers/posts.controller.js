const PostService = require('../services/posts.service');
const InvalidParamsError = require('../exceptions/index.exception');

class PostController {
  postService = new PostService();

  //*게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const post = await this.postService.createPost({ groupId, userId });
      res.status(200).json({
        ok: true,
        postId: post.postId,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;
