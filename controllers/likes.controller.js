const LikeService = require('../services/likes.service');

class LikeController { 
    likeService = new LikeService();

    updateLike = async(req,res,next)=>{
        try{
            const {userId} =res.locals.user;
            const {groupId,postId} = req.params;
            if(!groupId||!postId){
                throw new Error('잘못된 요청입니다.')
            }    
            const putLike = await this.likeService.putLike({userId,groupId,postId})
                
                res.status(201).json({data:putLike})
        }catch(error){
            next(error)
        }
    }
}
module.exports = LikeController