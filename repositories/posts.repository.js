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
  findGroupUserId = async ({ userId, groupId }) => {
    const findGroupUserId = await GroupUser.findOne({
      where: { userId, groupId },
    });
    return findGroupUserId;
  };
  //*게시글 전체 조회
  findAllPost = async ({ groupId, category, offset }) => {
    const { count, rows } = await Post.findAndCountAll({
      where: { [Op.and]: [{ groupId }, { category }] },
      offset: offset,
      limit: 8,
      attributes: [
        'postId',
        'commentCount',
        'likeCount',
        'createdAt',
        [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
        [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
        [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
      ],
      include: { model: GroupUser, attributes: [] },
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    console.log(count, rows);
    return rows;
  };
  // //*좋아요 눌렀는지 체크
  // findLike = async({});
  //*사진 찾기
  findPostImg = async ({ postIds, groupId, groupUserId }) => {
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
        where: { [Op.and]: [{ groupId }, { postId: postIds[i] }] },
        attributes: [
          'postId',
          'content',
          'commentCount',
          'likeCount',
          'createdAt',
          [Sequelize.col('GroupUser.groupUserId'), 'groupUserId'],
          [Sequelize.col('GroupUser.groupUserNickname'), 'groupUserNickname'],
          [Sequelize.col('GroupUser.groupAvatarImg'), 'groupAvatarImg'],
        ],
        include: { model: GroupUser, attributes: [] },
        raw: true,
      });
      let findLike = await Like.findOne({
        where: groupUserId,
        postId: post.postId,
      });
      if (findLike) {
        findLike = true;
      } else {
        findLike = false;
      }
      const Posts = { ...post, postImg, findLike };
      result.push(Posts);
    }
    return result;
  };
  //*게시글 상세 조회
  //postImg 추가해야함
  findPost = async ({ postId, groupUserId }) => {
    const result = [];
    const post = await Post.findOne({
      where: { postId },
      attributes: [
        'postId',
        'content',
        'postImg',
        'commentCount',
        'likeCount',
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
    let findLike = await Like.findOne({
      where: groupUserId,
      postId: post.postId,
    });
    if (findLike) {
      findLike = true;
    } else {
      findLike = false;
    }
    const Post = { post, postImg, findLike };
    result.push(Post);
    return result;
  };
  //*게시글 찾기
  existsPost = async ({ postId }) => {
    const existsPost = await Post.findOne({ where: { postId } });
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
