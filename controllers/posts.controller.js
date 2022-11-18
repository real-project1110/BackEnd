const PostService = require('../services/posts.service');
const InvalidParamsError = require('../exceptions/index.exception');

class PostController {
  postService = new PostService();

  //*게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const { title, content } = req.body;
      const category = 0;
      if (!title || !content) {
        throw new InvalidParamsError('내용을 입력해주세요');
      }
      const post = await this.postService.createPost({
        groupId,
        userId,
        title,
        content,
        category,
      });
      res.status(201).json({
        ok: true,
        postId: post.postId,
      });
    } catch (error) {
      next(error);
    }
  };

  //*공지/자유로 등록
  updatCategory = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      if (!postId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      await this.postService.updatCategory({
        postId,
        userId,
      });
      res.status(200).json({
        ok: true,
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
      if (!groupId || !category) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findAllPost = await this.postService.findAllPost({
        groupId,
        category,
      });
      res.status(200).json({
        ok: true,
        data: findAllPost,
      });
    } catch (error) {
      next(error);
    }
  };

  //*게시글 상세 조회
  findPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      if (!postId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findPost = await this.postService.findPost({ postId });
      res.status(200).json({
        ok: true,
        data: findPost,
      });
    } catch (error) {
      next(error);
    }
  };

  //*게시글 수정
  updatPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { title, content, category } = req.body;
      if (!postId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const updatPost = await this.postService.updatPost({
        postId,
        userId,
        title,
        content,
        category,
      });
      res.status(200).json({
        ok: true,
        data: updatPost,
      });
    } catch (error) {
      next(error);
    }
  };

  //*게시글 삭제
  deletPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      if (!postId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      await this.postService.deletPost({ postId, userId });
      res.status(200).json({
        ok: true,
        msg: '삭제 성공',
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;
