const CommentLikeRepository = require('../repositories/commentlikes.repository')

class CommentLikeService {
    commentlikeRepository = new CommentLikeRepository();

    CommentLike = async({userId,groupId,commentId})=>{
        const getGroupUser = await this.commentlikeRepository.getGroupUser({userId,groupId})
        if(!getGroupUser){
            throw new Error("유저 정보가 없습니다")
        }
        const findCommentLike = await this.commentlikeRepository.findCommentLike({groupUserId:getGroupUser.groupUserId,commentId})
        if(!findCommentLike){
            await this.commentlikeRepository.createCommentLike({groupUserId:getGroupUser.groupUserId,commentId})
            await this.commentlikeRepository.plusCommentLike({commentId})     
        }
        if(findCommentLike){
            await this.commentlikeRepository.deleteCommentLike({groupUserId:getGroupUser.groupUserId,commentId})
            await this.commentlikeRepository.minusCommentLike({commentId})
        }
    }
}
module.exports = CommentLikeService;