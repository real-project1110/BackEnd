const { ValidationError } = require('sequelize');
const PostImgRepository = require('../repositories/postImgs.repository');

// const deduplication = (a) => !image.includes(a.postImg);
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
  confirmPostImg = async ({ postId, image, groupId }) => {
    const findPost = await this.postImgRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('게시글이 존재하지 않습니다.');
    }
    const findPostImg = await this.postImgRepository.findPostImg({
      postId,
    });
    if (findPostImg.length == image.length) return;
    const delet = findPostImg.filter((a) => !image.includes(a.postImg));
    const deletPostImg = await this.postImgRepository.deletPostImg({
      postImg: delet,
    });
    return deletPostImg;
  };

  updatPostImg = async ({ postId, images, groupId }) => {
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
    const createPostImg = await this.postImgRepository.createPostImg({
      postId,
      postImgs,
      groupId,
    });
    return createPostImg;
  };
}

module.exports = PostImgService;
