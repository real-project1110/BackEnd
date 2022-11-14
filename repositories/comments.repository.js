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
}
module.exports = CommentRepository;
