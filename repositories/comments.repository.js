const { Comment, Post, GroupUser, CommentLike } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class CommentRepository extends Comment {
  constructor() {
    super();
  }
  //*댓글 작성
  createComment = async ({ postId, comment, groupUserId, groupId }) => {
    const createComment = await Comment.create({
      postId,
      comment,
      groupUserId,
      groupId,
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
  findAllComment = async ({ postId, groupId }) => {
    // const result = [];
    const findAllComment = await Comment.findAll({
      where: { postId, groupId },
      attributes: [
        'commentId',
        'comment',
        'createdAt',
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
        // [Sequelize.col('CommentLike.commentId'), 'commentId'],
      ],
      include: [{ model: GroupUser, attributes: [] }],
      // include: [{ model: CommentLike, attributes: [] }],
      raw: true,
      order: [['createdAt', 'DESC']],
    });
    console.log(findAllComment);
    // let findLike = await CommentLike.findOne({
    //   where: { groupUserId, postId: post.postId },
    // });
    // if (findLike) {
    //   findLike = true;
    // } else {
    //   findLike = false;
    // }
    return findAllComment;
  };
  findAllCommentLike = async ({
    commentIds,
    postId,
    groupUserId,
    groupId,
    offset,
  }) => {
    const result = [];
    for (let i = 0; i < commentIds.length; i++) {
      let commentLike = await CommentLike.findOne({
        where: { commentId: commentIds[i], groupUserId },
        raw: true,
      });
      if (commentLike) {
        commentLike = true;
      } else {
        commentLike = false;
      }
      const { count, rows } = await Comment.findAndCountAll({
        where: { postId, groupId, commentId: commentIds[i] },
        offset: offset,
        limit: 3,
        attributes: [
          'commentId',
          'comment',
          'likeCount',
          'createdAt',
          [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
          [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
          [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
        ],
        include: [{ model: GroupUser, attributes: [] }],
        raw: true,
        order: [['createdAt', 'DESC']],
      });
      const comments = { rows, commentLike };
      result.push(comments);
    }
    return result;
  };

  //*댓글 찾기
  findComment = async ({ commentId }) => {
    const findComment = await Comment.findOne({ where: { commentId } });
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
