const { User, GroupList, Comment, Post, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index');

class SearchRepository {
  constructor() {
    super();
  }
  findUserNickname = async ({ keyword }) => {
    const findUserNickname = await GroupUser.findOne({ where: { keyword } });
    return findUserNickname;
  };
  userPostSearch = async ({ groupUserId }) => {
    const userPostSearch = await Post.findAll({
      where: { groupUserId },
      attributes: [
        postId,
        title,
        commentCount,
        createdAt,
        [Sequelize.col('GroupUser.groupUserUserId'), 'groupUserUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        // [Sequelize.col('GroupUser.groupAvatarimg'), 'groupAvatarimg'],
      ],
      include: [{ model: GroupUser }],
      order: ['createdAt', 'DESC'],
    });
    return userPostSearch;
  };
  postSearch = async ({ keyword, groupId }) => {
    const keyword = keyword;
    const groupId = groupId;
    // const postSearch = await Post.findAll({
    //   where: {
    //     title: {
    //       [Op.like]: `%${keyword}&`,
    //     },
    //   },
    // });
    // return postSearch;
    const query = `SELECT p.postId,p.groupId,p.title,p.content,p.postImg,p.commentCount,p.createdAt,gu.groupUserId,gu.groupUserNickname,gu.groupAvatarImg 
                   FROM posts p 
                   INNER JOIN groupusers gu ON ${groupId} = gu.groupId 
                   WHERE p.title LIKE %${keyword}%`;
    const result = await sequelize.query(query, { type: QueryTypes.SELECT });

    return result;
  };
}
module.exports = SearchRepository;
