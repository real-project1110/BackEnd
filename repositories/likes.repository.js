const {Like,GroupUser,Post}= require('../models');
class LikeRepository{
    getGroupUser =async({userId,groupId})=>{
        const getGroupUser =await GroupUser.findOne({where :{userId,groupId }})
        console.log('repo getgroupuser',getGroupUser.userId)
        return getGroupUser
    }
    getPostId = async({postId})=>{
        const getPostId = await Post.findOne({where : {postId}})
        console.log('repo getPostId', getPostId.postId)
        return getPostId
    }

    createLike = async({groupUserId,postId})=>{
        const createLike = await Like.create({where :{groupUserId,postId}})
        return createLike;
    }

    deleteLike = async({groupUserId,postId})=>{
        const deleteLike = await Like.destroy({where:{groupUserId,postId}})
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
        const findlike = await Like.findOne({where:{groupUserId,postId}})
        return findlike
    }
}
module.exports = LikeRepository