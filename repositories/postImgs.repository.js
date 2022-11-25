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
}

module.exports = PostImgRepository;
