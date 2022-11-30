const {CommentLike,GroupUser,Comment}= require('../models');
class CommentLikeRepository{
    getGroupUser =async({userId,groupId})=>{
        const getGroupUser =await GroupUser.findOne({where :{userId,groupId }})
        return getGroupUser
    }

    findCommentLike = async({groupUserId,commentId})=>{
        const findCommentLike = await CommentLike.findOne({where:{groupUserId,commentId}})
        return findCommentLike
    }

     createCommentLike = async({groupUserId,commentId})=>{
        const createCommentLike = await CommentLike.create({groupUserId,commentId})
        return createCommentLike;
    }

    deleteCommentLike = async({groupUserId,commentId})=>{
        const deleteCommentLike = await CommentLike.destroy({where:{groupUserId,commentId}})
        return deleteCommentLike;
    }

    plusCommentLike = async({commentId})=>{
        const plusCommentLike = await Comment.increment({likeCount:1},{where:{commentId}})
        return plusCommentLike
    }

    minusCommentLike = async({commentId})=>{
        const minusCommentLike = await Comment.increment({likeCount:-1},{where:{commentId}})
        return minusCommentLike
    }

}
module.exports = CommentLikeRepository