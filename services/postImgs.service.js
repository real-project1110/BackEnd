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
  confirmPostImg = async ({ postId, image, groupId }) => {
    const findPost = await this.postImgRepository.findPost({ postId });
    if (!findPost) {
      throw new ValidationError('게시글이 존재하지 않습니다.');
    }
    const findPostImg = await this.postImgRepository.findPostImg({
      image,
    });
    console.log('이미지만', image);
    console.log('파인드포스트이미지', findPostImg);
    if (findPostImg.length == image.length) return;
    const delet = findPostImg.filter((a) => image.includes(a.postImg));
    console.log('필터로 나눈거', delet);
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
