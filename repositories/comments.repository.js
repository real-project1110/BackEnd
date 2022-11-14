const { Comment, Post, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class CommentRepository extends Comment {
  constructor() {
    super();
  }
  //*댓글 작성
  createComment = async ({ postId, comment, groupUserId }) => {
    const createComment = await Comment.create({
      postId,
      comment,
      groupUserId,
    });
    return createComment;
  };

  //*댓글 전체 조회
  findAllComment = async ({ postId }) => {
    const findAllComment = await Comment.findAll({
      where: { postId },
      attributes: [
        commentId,
        comment,
        createdAt,
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        // [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
      ],
      include: [{ model: GroupUser }],
      order: ['createdAt', 'DESC'],
    });
    return findAllComment;
  };
}
module.exports = CommentRepository;
