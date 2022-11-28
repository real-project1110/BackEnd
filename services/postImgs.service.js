const { ValidationError } = require('sequelize');
const PostImgRepository = require('../repositories/postImgs.repository');

class PostImgService {
  postImgRepository = new PostImgRepository();

  //*게시글 사진 생성
  createPostImg = async ({ postId, images, groupId }) => {
    const findPost = await this.postImgRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('게시글이 존재하지 않습니다.');
    }
    const postImgs = [];
    for (let i = 0; i < images.length; i++) {
      const postImage = images[i].location;
      postImgs.push(postImage.replace(/\/original\//, '/statUS/'));
    }
    const createPostImg = await this.postImgRepository.createPostImg({
      postId,
      postImgs,
      groupId,
    });
    return createPostImg;
  };

  updatPostImg = async ({ postId, images, groupId }) => {
    console.log('서비스콘솔', images);
    const findPost = await this.postImgRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('게시글이 존재하지 않습니다.');
    }
    // await this.postImgRepository.deletPostImg({ postId, groupId });
    const postImgs = [];
    for (let i = 0; i < images.length; i++) {
      const postImage = images[i].location;
      postImgs.push(postImage.replace(/\/original\//, '/statUS/'));
    }
    console.log('포스트이미지스', postImgs);
    const createPostImg = await this.postImgRepository.createPostImg({
      postId,
      postImgs,
      groupId,
    });
    console.log('이미지서비스', createPostImg);
    return createPostImg;
  };
}

module.exports = PostImgService;
