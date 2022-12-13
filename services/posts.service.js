const PostRepository = require('../repositories/posts.repository');
const ValidationError = require('../exceptions/index.exception');

const getPostId = (a) => a.postId;

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }
  //*게시글 작성
  createPost = async ({ groupId, userId, content, category }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const createPost = await this.postRepository.createPost({
      groupId,
      content,
      category,
      groupUserId: findGroupUserId.groupUserId,
    });
    return createPost;
  };

  //*공지/자유로 변경
  updatCategory = async ({ postId, userId, groupId }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const existsPost = await this.postRepository.existsPost({ postId });
    if (!existsPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    if (existsPost.category == 0) {
      const category = 1;
      return await this.postRepository.noticePost({ postId, category });
    } else if (existsPost.category == 1) {
      const category = 0;
      return await this.postRepository.freePost({ postId, category });
    }
  };

  //*게시글 전체 조회
  findAllPost = async ({ userId, groupId, category, page }) => {
    const offset = (parseInt(page) - 1) * 8;
    const findAllPost = await this.postRepository.findAllPost({
      groupId,
      category,
      offset,
    });
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    // const findLike = await this.postRepository.findLike({
    //   groupUserId: findGroupUserId.groupUserId,
    // });
    if (!findAllPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const postIds = findAllPost.map((a) => a.postId);
    const findPostImg = await this.postRepository.findPostImg({
      postIds,
      groupId,
      groupUserId: findGroupUserId.groupUserId,
    });
    return findPostImg;
  };

  //*게시글 상세 조회
  findPost = async ({ postId }) => {
    const findGroupUserId = await this.postRepository.findGroupUserId({
      userId,
      groupId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findPost = await this.postRepository.findPost({
      postId,
      groupUserId: findGroupUserId.groupUserId,
    });
    if (!findPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    return findPost;
  };

  //*게시글 수정
  updatPost = async ({ postId, userId, content, groupId }) => {
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
    const existsPost = await this.postRepository.existsPost({ postId });
    if (!existsPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const updatPost = await this.postRepository.updatPost({
      postId,
      content,
      groupUserId: findGroupUserId.groupUserId,
    });
    return updatPost;
  };

  //*게시글 삭제
  deletPost = async ({ postId, userId, groupId }) => {
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
    const existsPost = await this.postRepository.existsPost({ postId });
    if (!existsPost) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const deletPost = await this.postRepository.deletPost({
      postId,
      groupUserId: findGroupUserId.groupUserId,
    });
    return deletPost;
  };
}
module.exports = PostService;
