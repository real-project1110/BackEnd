const LikeRepository = require('../repositories/likes.repository')

class LikeService {
    likeRepository = new LikeRepository();
    
    putLike = async({userId,groupId,postId})=>{
        const getGroupUser = await this.likeRepository.getGroupUser({userId,groupId})
        if(!getGroupUser){
            throw new Error("유저 정보가 없습니다")
        }
        const findLike = await this.likeRepository.findLike({groupUserId:getGroupUser.groupUserId,postId})
        if(!findLike){
            await this.likeRepository.createLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.likeRepository.plusLike({postId})     
        }
        if(findLike){
            await this.likeRepository.deleteLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.likeRepository.minusLike({postId})
        }
    }

    findLike = async({postId})=>{
        const findlike = await this.likeRepository.findLike({groupUserId,postId})
        return findlike
    }

    getGroupUser = async({userId,groupId})=>{
        const getGroupUser = await this.likeRepository.getGroupUser({userId,groupId})
        return getGroupUser
    }

    likeCount = async({postId})=>{
        const likeCount = await this.likeRepository.getPostId({postId})
        return likeCount
    }
}
module.exports = LikeService;