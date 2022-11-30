const {PostLike,GroupUser,Post}= require('../models');
class PostLikeRepository{
    getGroupUser =async({userId,groupId})=>{
        const getGroupUser =await GroupUser.findOne({where :{userId,groupId }})
        return getGroupUser
    }

    createLike = async({groupUserId,postId})=>{
        const createLike = await PostLike.create({groupUserId,postId})
        return createLike;
    }

    deleteLike = async({groupUserId,postId})=>{
        const deleteLike = await PostLike.destroy({where:{groupUserId,postId}})
        return deleteLike;
    }

    plusLike = async({postId})=>{
        const plusLike = await Post.increment({likeCount:1},{where:{postId}})
        return plusLike
    }

    minusLike = async({postId})=>{
        const minusLike = await Post.increment({likeCount:-1},{where:{postId}})
        return minusLike
    }
    
    findLike = async({groupUserId,postId})=>{
        const findlike = await PostLike.findOne({where:{groupUserId,postId}})
        return findlike
    }
}
module.exports = PostLikeRepository