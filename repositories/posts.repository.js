const { Post, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class PostRepository extends Post {
  constructor() {
    super();
  }
  //*게시글 작성
  createPost = async ({ post }) => {
    const createPost = await Post.create({ ...post });
    return createPost;
  };
  //*그룹유저 찾기
  findGroupUserId = async ({ userId }) => {
    const findGroupUserId = await GroupUser.findByPk(userId);
    return findGroupUserId;
  };
  //*게시글 전체 조회
  findAllPost = async ({ groupId, category }) => {
    const findAllPost = await Post.findAll({
      where: { [Op.and]: [{ groupId }, { category }] },
      attributes: [
        postId,
        title,
        commentCount,
        createdAt,
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        // [Sequelize.col('GroupUser.groupAvatarimg'), 'groupAvatarimg'],
      ],
      include: [{ model: GroupUser }],
      order: ['createdAt', 'DESC'],
    });
    return findAllPost;
  };
  //*게시글 상세 조회
  //postImg 추가해야함
  findPost = async ({ postId }) => {
    const findPost = await Post.findOne({
      where: { postId },
      attributes: [
        postId,
        title,
        content,
        commentCount,
        createdAt,
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        // [Sequelize.col('GroupUser.groupAvatarimg'), 'groupAvatarimg'],
      ],
      include: [{ model: GroupUser }],
    });
    return findPost;
  };
}
module.exports = PostRepository;
