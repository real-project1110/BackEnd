const CommentLikeService = require('../services/commentlikes.service');

class CommentLikeController { 
    commentlikeService = new CommentLikeService();

    updateCommentLike = async(req,res,next)=>{
        try{
            const{userId}=res.locals.user;
            const{groupId,commentId}=req.params;
            if(!groupId||!commentId){
                throw new Error('존재하지 않은 정보입니다')
            }
            const CommentLike = await this.commentlikeService.CommentLike({userId,groupId,commentId})
            res.status(201).json({data:CommentLike})
        }catch(error){
            next(error)
        }
    }
}
module.exports = CommentLikeController