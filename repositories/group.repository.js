const {Group} = require('../models')

class GroupRepository{

    createGroup = async (groupName,groupImg)=>{
        await Group.create({groupName,groupImg})
    };

    updateGroupName = async (groupId,groupName)=>{
        await Group.upadte({groupName},{where:{groupId}})
    }

    updateGroupImg = async (groupId,groupImg)=>{
        await Group.upadte({groupImg},{where:{groupId}})
    }

    findOneGroup = async (groupId)=>{
        const findOneGroup = await Group.findOne({where:{groupId}})
        return findOneGroup
    }

    findAllGroup = async ()=>{
        const findAllGroup = await Group.findAll()
        return findAllGroup
    }

    destroyGroup = async (groupId)=>{
        await Group.destroy({where:{groupId}})
    }


}

module.exports = GroupRepository