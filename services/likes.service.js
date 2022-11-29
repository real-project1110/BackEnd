const LikeRepository = require('../repositories/likes.repository')

class LikeService {
    likeRepository = new LikeRepository();
    
    createLike = async({userId,groupId,postId})=>{
        const getGroupUser = await this.likeRepository.getGroupUser({userId,groupId})
        console.log('service1111111111',getGroupUser.groupUserId)
        if(!getGroupUser){
            throw new Error("유저 정보가 없습니다")
        }
        const getPostId = await this.likeRepository.getPostId({postId})
        console.log('service',getPostId.postId)
        if(!getPostId){
            throw new Error("작성글이 존재하지 않습니다")
        }
        console.log('111111',getPostId.likeCount)
        const findLike = await this.likeRepository.findLike({groupUserId:getGroupUser.groupUserId,postId})
        console.log('222222222222',findLike)
        if(!findLike){
            await this.likeRepository.createLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.likeRepository.plusLike({postId})     
        }
        return findLike
    }

    findLike = async({groupUserId,postId})=>{
        const findlike = await this.likeRepository.findLike({groupUserId,postId})
        return findlike
    }

    getGroupUser = async({userId,groupId})=>{
        const getGroupUser = await this.likeRepository.getGroupUser({userId,groupId})
        return getGroupUser
    }

    deleteLike = async({userId,groupId,postId})=>{
        const getGroupUser = await this.likeRepository.getGroupUser({userId,groupId})
        if(!getGroupUser){
            throw new Error("유저 정보가 없습니다")
        }
        const getPostId = await this.likeRepository.getPostId({postId})
        if(!getPostId){
            throw new Error("작성글이 존재하지 않습니다")
        } 
        const findLike = await this.likeRepository.findLike({groupUserId:getGroupUser.groupUserId,postId})
        if(!findLike){
            await this.likeRepository.deleteLike({groupUserId:getGroupUser.groupUserId,postId})
            await this.likeRepository.minusLike({postId})
        }
        return findLike
    }

    likeCount = async({postId})=>{
        const likeCount = await this.likeRepository.getPostId({postId})
        return likeCount
    }
}
module.exports = LikeService;