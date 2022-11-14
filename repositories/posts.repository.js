const { Post, GroupUser } = require('../models');

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
  findAllPost = async ({ groupId }) => {
    const findAllPost = await Post.findAll({ where: { groupId } });
    return findAllPost;
  };
}
module.exports = PostRepository;
