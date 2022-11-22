const GroupService = require('../services/groups.service')

class GroupController{
    groupService = new GroupService()

    createGroup = async(req,res,next)=>{
        try{
        const {groupName}= req.body
        const {user} =res.locals
        const userId = user.userId
        const createGroup = await this.groupService.createGroup(groupName,userId)
        res.status(201).json({data:createGroup})
        }catch(error){
            next(error)
        }
    }

    updateGroupName = async(req,res)=>{
        try{
        const {groupId} = req.params
        const {groupName} = req.body
        const updategroup = await this.groupService.updateGroupName(groupId,groupName)
        res.status(200).json({data:updategroup})
        }catch(err){
            res.status(400).json(err)
        }
    }

    
    updateGroupImg = async(req,res)=>{
        try{
        const {groupId} = req.params
        const {groupImg} = req.body
        const updategroup = await this.groupService.updateGroupName(groupId,groupImg)
        res.status(200).json({data:updategroup})
        }catch(err){
            res.status(400).json(err)
        }
    }

    findOneGroup = async(req,res)=>{
        try{
            const {groupId} = req.params
            const findgroup = await this.groupService.findOneGroup(groupId)
            res.status(200).json({data:findgroup})
        }catch(err){
            res.status(400).json(err)
        }
    }

    findAllGroup = async(req,res,next)=>{
        try{
            const findgroup = await this.groupService.findAllGroup()
            res.status(200).json({data:findgroup})
        }catch(error){
            next(error)
        }
    }

    destroyGroup = async(req,res)=>{
        try{
            const {groupId} = req.params
            const destroygroup= await this.groupService.destroyGroup(groupId)
            res.status(200).json({data:destroygroup})
        }catch(err){
            res.status(400).json(err)
        }
    }

    updateGroupNic=async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupId} =req.params;
            const {groupUserNickname} =req.body;
            const updateNic = await this.groupService.updateNic(userId,groupId,groupUserNickname)
            res.status(200).json({data:updateNic.groupUserNickname,message:"그룹내 닉네임 변경완료"})
        }catch(error){
            next(error)
        }
    }

    findGroupProfile = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupId} = req.params;
            const getProfile = await this.groupService.getProfile(userId,groupId)
            res.status(200).json({data:getProfile})
        }catch(error){
            next(error)
        }
    }

    findGroupUser = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupUserId} = req.params;
            const getUser = await this.groupService.getUser(userId,groupUserId)
            res.status(200).json({data:getUser})
        }catch(error){
            next(error)
        }
    }

    findAllGroupUser = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupId} = req.params;
            const findAllGU = await this.groupService.findAllGU(userId,groupId)
            res.status(200).json({data:findAllGU})
        }catch(error){
            next(error)
        }
    }

    postStatus =async(req,res,next)=>{
        try{
            const {userId}=res.locals.user;
            const {groupId} = req.params;
            const {status,statusMessage}=req.body
            const poststatus = await this.groupService.postStatus(userId,groupId,status,statusMessage)
            res.status(201).json({data:poststatus})
        }catch(error){
            next(error)
        }
    }

    changeStatus = async(req,res,next)=>{
        try{
            const {userId}=res.locals.user;
            const {groupId}=req.params;
            const {status,statusMessage}=req.body;
            const updateStatus = await this.groupService.updateStatus(userId,groupId,status,statusMessage)
            res.status(201).json({data:updateStatus})
        }catch(error){
            next(error)
        }
    }

    createGroupUser = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupId} = req.body;
            const creategroupuser = await this.groupService.createGroupUser(userId,groupId)
            res.status(201).json({data:creategroupuser})
        }catch(error){
            next(error)
        }
    }
}

module.exports = GroupController