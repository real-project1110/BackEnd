const LikeService = require('../services/likes.service');

class LikeController { 
    likeService = new LikeService();

    updateLike = async(req,res,next)=>{
        // try{
            const {userId} =res.locals.user;
            const {groupId,postId} = req.params;
            const getGroupUser = await this.likeService.getGroupUser({userId,groupId})
            // console.log('11111111111111111',getGroupUser.userId,getGroupUser.groupId,postId,getGroupUser.groupUserId)
            const findLike = await this.likeService.likeCount({postId})
            console.log('33333333333333333333333333333333',findLike.likeCount)
            if(findLike.likeCount===0){
                console.log('123123',findLike.likeCount)
                const createLike = await this.likeService.createLike({userId,groupId,postId})
                console.log('crcrcr11111',createLike)
                res.status(201).json({data:createLike,message:"좋아요를 등록하셨습니다"})
            }

            if(findLike.likeCount===1){
                const deleteLike = await this.likeService.deleteLike({groupUserId,postId})
                res.status(200).json({data:deleteLike,message:"좋아요를 취소하였습니다."})
            }
            
        // }catch(error){
        //     next(error)
        // }
        // try{
            // const {userId} = res.locals.user;
            // const {groupId,postId}=req.params;
            // const findLike =await this.likeService.findLike({userId,groupId,postId})
            // if(!findLike){
            //     const createLike = await this.likeService.createLike({groupUserId:findLike.userId,groupUserId:findLike.groupId,postId})
            //     const likeCount = await this.likeService.likeCount({postId});
            //     return res.status(201).json({createLike,data:likeCount,message:"좋아요를 등록하셨습니다"})
            // }
            // if(findLike){
            //     const deleteLike = await this.likeService.deleteLike({userId,groupId,postId})
            //     const likeCount = await this.likeService.likeCount({postId});
            //     return res.status(200).json({deleteLike,data:likeCount,message:"좋아요를 취소하셨습니다"})
            // }
    //     }catch(error){
    //         next(error)
    //     }
    }
}
module.exports = LikeController