const ChattingService = require('../services/chatting.service')

class ChattingController {
    chattingService = new ChattingService()

    createRoom = async(req,res,next)=>{
        try{
        const {groupId}=req.params
        const {groupUserId} = req.body
        const {userId}=res.locals.user
        const findGroupUser = await this.chattingService.findGroupUser({groupId,userId})
        if(findGroupUser.groupUserId>groupUserId){
            var groupUserIds = String(groupUserId)+','+String(findGroupUser.groupUserId)
            
        }else{
            var groupUserIds = String(findGroupUser.groupUserId)+','+String(groupUserId)
        }
        console.log(groupUserIds)
        const findRoom = await this.chattingService.findRoom({groupId,groupUserIds})
        if (!findRoom){
        const createRoom = await this.chattingService.createRoom({
            groupId,
            groupUserIds
        })
        res.status(201).json({data:createRoom})}
        else{
            res.status(200).json({data:findRoom})
        }
        }catch(err){
            next(err)
        }
    }

    createChat = async(req,res,next)=>{
        try{
        const {roomId}=req.params;
        const {message}= req.body
        const {userId} = res.locals.user
        const createChat=await this.chattingService.createChat({roomId,userId,message})
        res.status(201).json({data:createChat})
        }catch(err){
            next(err)
        }
    }

    findRoom = async(req,res,next)=>{
        try{
            const {groupId} = req.params
            const {userId}=res.locals.user
            const findRoom = await this.chattingService.findRoom({groupId,userId})
            res.status(200).json({data:findRoom})
        }catch(err){
            next(err)
        }
    }

    getChat = async(req,res,next)=>{
        try{
            const {roomId}=req.params
            const getChat = await this.chattingService.getChat({roomId})
            res.status(200).json({data:getChat})
        }catch(err){
            next(err)
        }
    }

}
module.exports = ChattingController