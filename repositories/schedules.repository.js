const {Schedule,GroupUser} = require('../models')

class ScheduleRepository{
    findGroupUserId = async(userId,groupId)=>{
       const groupuser= await GroupUser.findOne({where:userId,groupId})
       return {groupUserId:groupuser.groupUserId}
    }
    createSchedule = async (title,description,start,end,color,groupUserId,groupId)=>{
        await Schedule.create({title,description,start,end,color,groupUserId,groupId})
    };

    updateSchedule = async (scheduleId,title,description,start,end,color,groupId)=>{
        await Schedule.update({title,description,start,end,color},{where:{scheduleId,groupId}})
        
    }

    findAllSchedule = async (groupId)=>{
        const findAllSchedule = await Schedule.findAll({where:{groupId}})
        return findAllSchedule
    }
    
    findOneSchedule = async (scheduleId,groupId)=>{
        const findOneSchedule = await Schedule.findOne({where:{scheduleId,groupId}})
        return findOneSchedule
    }

    destroySchedule = async (scheduleId,groupId)=>{
        await Schedule.destroy({where:{scheduleId,groupId}})
    }


}

module.exports = ScheduleRepository