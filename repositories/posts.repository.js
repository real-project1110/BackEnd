const { Post, GroupUser, PostImg } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class PostRepository extends Post {
  constructor() {
    super();
  }
  //*게시글 작성
  createPost = async ({ groupId, content, category, groupUserId }) => {
    const createPost = await Post.create({
      groupId,
      content,
      category,
      groupUserId,
    });
    return createPost;
  };
  //*그룹유저 찾기
  findGroupUserId = async ({ userId }) => {
    const findGroupUserId = await GroupUser.findOne({ where: { userId } });
    return findGroupUserId;
  };
  //*게시글 전체 조회
  findAllPost = async ({ groupId, category }) => {
    const posts = await Post.findAll({
      where: { [Op.and]: [{ groupId }, { category }] },
      attributes: [
        'postId',
        'commentCount',
        'createdAt',
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
      ],
      include: { model: GroupUser, attributes: [] },
      order: [['createdAt', 'DESC']],
    });
    console.log('포스트0번째', posts[0]);
    return posts;
  };
  findPostImg = async ({ postIds, groupId }) => {
    const result = [];
    for (let i = 0; i < postIds.length; i++) {
      let postImg = await PostImg.findAll({
        where: { postId: postIds[i] },
        attributes: ['postImg'],
      });
      if (!postImg) {
        return (postImg = null);
      }
      const post = await Post.findOne({
        where: { postid: postIds[i] },
        raw: true,
      });

      const Posts = { ...post, postImg };
      result.push(Posts);
    }
    return result;
  };
  //*게시글 상세 조회
  //postImg 추가해야함
  findPost = async ({ postId }) => {
    const result = [];
    const post = await Post.findOne({
      where: { postId },
      attributes: [
        'postId',
        'content',
        'postImg',
        'commentCount',
        'createdAt',
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
      ],
      include: [{ model: GroupUser, attributes: [] }],
    });
    let postImg = await PostImg.findAll({
      where: { postId },
      attributes: ['postImg'],
    });
    if (!postImg) {
      return (postImg = null);
    }
    const Post = { post, postImg };
    result.push(Post);
    return result;
  };
  //*게시글 찾기
  existsPost = async ({ postId }) => {
    const existsPost = await Post.findByPk(postId);
    return existsPost;
  };
  //*게시글 수정
  updatPost = async ({ postId, content, groupUserId }) => {
    const updatPost = await Post.update(
      { content },
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
