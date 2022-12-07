const PostLikeService = require('../services/postlikes.service');

class PostLikeController { 
    postlikeService = new PostLikeService();

    updateLike = async(req,res,next)=>{
        try{
            const {userId} =res.locals.user;
            const {groupId,postId} = req.params;
            if(!groupId||!postId){
                throw new Error('존재하지 않은 정보입니다')
            }    
            const putLike = await this.postlikeService.putLike({userId,groupId,postId})
            res.status(201).json({data:putLike})
        }catch(error){
            next(error)
        }
    }
}
module.exports = PostLikeController