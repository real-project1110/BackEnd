const { Post, GroupUser } = require('../models');
const { Op } = require('sequelize');

class PostRepository extends Post {
  constructor() {
    super();
  }
  //*게시글 작성
  createPost = async ({ post }) => {
    const createPost = await Post.create({ ...post });
    return createPost;
  };
  findGroupUserId = async ({ userId }) => {
    const findGroupUserId = await GroupUser.findByPk(userId);
    return findGroupUserId;
  };
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
}
module.exports = PostRepository;
