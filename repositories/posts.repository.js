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
    return findGroupUserId.groupUserId;
  };
}
module.exports = PostRepository;
