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
  //*게시글 찾기
  existsPost = async ({ postId }) => {
    const existsPost = await Post.findByPk(postId);
    return existsPost;
  };
  //*게시글 수정
  updatPost = async ({ postId, title, content, category, groupUserId }) => {
    const updatPost = await Post.update(
      { title, content, category },
      { where: { [Op.and]: [{ postId }, { groupUserId }] } },
    );
    return updatPost;
  };
  //*게시글 삭제
  deletPost = async ({ postId, groupUserId }) => {
    const deletPost = await Post.destroy({
      where: { [Op.and]: [{ postId }, { groupUserId }] },
    });
    return deletPost;
  };
  //*공지로 변경
  noticePost = async ({ postId, category }) => {
    const noticePost = await Post.update({ category }, { where: { postId } });
    return noticePost;
  };
  //*자유로 변경
  freePost = async ({ postId, category }) => {
    const freePost = await Post.update({ category }, { where: { postId } });
    return freePost;
  };
}
module.exports = PostRepository;
