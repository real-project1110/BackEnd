const { PostImg, Post } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class PostImgRepository extends PostImg {
  constructor() {
    super();
  }

  //*게시글 찾기
  findPost = async ({ postId }) => {
    const findPost = await Post.findOne({ where: { postId } });
    return findPost;
  };

  //*게시글사진 생성
  createPostImg = async ({ postId, postImgs, groupId }) => {
    for (let i = 0; i < postImgs.length; i++) {
      await PostImg.create({
        postId,
        postImg: postImgs[i],
        groupId,
      });
    }
  };
  //*컨펌이미지
  findPostImg = async ({ image }) => {
    const result = [];
    for (let i = 0; i < image.length; i++) {
      const find = await PostImg.findOne({ where: { postImg: image[i] } });
      result.push(find.postImg);
    }
    return result;
  };
  //*게시글 사진 삭제
  deletPostImg = async ({ postImg }) => {
    for (let i = 0; i < postImg.length; i++) {
      await PostImg.destroy({ where: { postImg: postImg[i] } });
    }
    // const deletPostImg = await PostImg.destroy({
    //   where: { [Op.and]: [{ groupId }, { postId }] },
    // });
    // return deletPostImg;
  };
}

module.exports = PostImgRepository;
