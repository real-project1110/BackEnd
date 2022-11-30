const PostLikeRepository = require('../repositories/postlikes.repository')

class PostLikeService {
    postlikeRepository = new PostLikeRepository();
    
    putLike = async({userId,groupId,postId})=>{
        const getGroupUser = await this.postlikeRepository.getGroupUser({userId,groupId})
        if(!getGroupUser){
            throw new Error("유저 정보가 없습니다")
        }
        const findLike = await this.postlikeRepository.findLike({groupUserId:getGroupUser.groupUserId,postId})
        if(!findLike){
            await this.postlikeRepository.createLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.postlikeRepository.plusLike({postId})     
        }
        if(findLike){
            await this.postlikeRepository.deleteLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.postlikeRepository.minusLike({postId})
        }
    }

    // findLike = async({postId})=>{
    //     const findlike = await this.postlikeRepository.findLike({groupUserId,postId})
    //     return findlike
    // }

    // getGroupUser = async({userId,groupId})=>{
    //     const getGroupUser = await this.postlikeRepository.getGroupUser({userId,groupId})
    //     return getGroupUser
    // }

    // likeCount = async({postId})=>{
    //     const likeCount = await this.postlikeRepository.getPostId({postId})
    //     return likeCount
    // }
}
module.exports = PostLikeService;