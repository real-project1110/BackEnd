const PostService = require('../services/posts.service');
const InvalidParamsError = require('../exceptions/index.exception');

class PostController {
  postService = new PostService();

  //*게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const { title, content, category } = req.body;
      if (!title || !content || !category) {
        throw new InvalidParamsError('내용을 입력해주세요');
      }
      const post = await this.postService.createPost({
        groupId,
        userId,
        title,
        content,
        category,
      });
      res.status(200).json({
        ok: true,
        postId: post.postId,
      });
    } catch (error) {
      next(error);
    }
  };
  //*게시글 전체 조회
  // 그룹아바타이미지 추가해야함
  findAllPost = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { category } = req.query;
      const { userId } = res.locals.user;
      const findAllPost = await this.postService.findAllPost({
        groupId,
        category,
        userId,
      });
      if (!findAllPost) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      res.status(200).json({
        ok: true,
        data: findAllPost,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;
