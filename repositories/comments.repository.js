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

  //*게시글 카운트 증가
  upCount = async ({ postId }) => {
    const upCount = await Post.increment(
      { commentCount: 1 },
      { where: { postId } },
    );
    return upCount;
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

  //*댓글 찾기
  findComment = async ({ commentId }) => {
    const findComment = await Comment.findByPk(commentId);
    return findComment;
  };

  //*댓글 수정
  updatComment = async ({ commentId, comment, groupUserId }) => {
    const updatComment = await Comment.update(
      { comment },
      { where: { [Op.and]: [{ commentId, groupUserId }] } },
    );
    return updatComment;
  };

  //*댓글 삭제
  deletComment = async ({ commentId, groupUserId }) => {
    const deletComment = await Comment.destroy({
      where: { commentId, groupUserId },
    });
    return deletComment;
  };

  //*게시글 카운드 감소
  downCount = async ({ postId }) => {
    const downCount = await Post.increment(
      { commentCount: -1 },
      { where: { postId } },
    );
    return downCount;
  };
}
module.exports = CommentRepository;
