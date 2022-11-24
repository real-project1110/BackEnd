const { ValidationError } = require('sequelize');
const PostImgRepository = require('../repositories/postImgs.repository');

class PostImgService {
  postImgRepository = new PostImgRepository();

  //*게시글 사진 생성
  createPostImg = async ({ postId, postImgs }) => {
    const findPost = await this.postImgRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('게시글이 존재하지 않습니다.');
    }
    const createPostImg = await this.postImgRepository.createPostImg({
      postId,
      postImgs,
    });
    return createPostImg;
  };
}

module.exports = PostImgService;