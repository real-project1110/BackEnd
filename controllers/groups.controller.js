const GroupService = require('../services/groups.service')

class GroupController{
    groupService = new GroupService()

    createGroup = async(req,res)=>{
        try{
        const {groupName,groupImg}= req.body
        const {user} =res.locals
        const userId = user.userId
        const creategroup = await this.groupService.createGroup(groupName,groupImg,userId)
        res.status(201).json({data:creategroup})
        }catch(err){
        console.log("아래")
            res.status(400).json(err)
        
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

    findAllGroup = async(req,res)=>{
        try{
            const findgroup = await this.groupService.findAllGroup()
            res.status(200).json({data:findgroup})
        }catch(err){
            res.status(400).json(err)
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
            res.status(200).json({data:updateNic})
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
}

module.exports = GroupController