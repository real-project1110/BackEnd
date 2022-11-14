const GroupService = require('../services/group.service')

class GroupController{
    groupService = new GroupService()

    createGroup = async(req,res)=>{
        try{
        const {groupName,groupImg}= req.body
        const creategroup = await this.groupService.createGroup(groupName,groupImg)
        res.status(201).json({data:creategroup})
        }catch(err){
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
}

module.exports = GroupController