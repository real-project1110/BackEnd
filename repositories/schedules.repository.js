const {Schedule,GroupUser} = require('../models')

class ScheduleRepository{
    findGroupUserId = async(userId,groupId)=>{
       const groupuser= await GroupUser.findOne({where:userId,groupId})
       return {groupUserId:groupuser.groupUserId}
    }
    createSchedule = async (title,description,start,end,color,groupUserId,groupId)=>{
        await Schedule.create({title,description,start,end,color,groupUserId,groupId})
    };

    updateSchedule = async (title,description,start,end,color,scheduleId)=>{
        await Schedule.upadte({title,description,start,end,color},{where:{scheduleId}})
    }

    findAllSchedule = async (groupId)=>{
        const findAllSchedule = await Schedule.findAll({where:{groupId}})
        return findAllSchedule
    }
    
    findOneSchedule = async (groupId,scheduleId)=>{
        console.log(groupId,scheduleId)
        const findOneSchedule = await Schedule.findOne({where:{groupId,scheduleId}})
        return findOneSchedule
    }

    destroySchedule = async (scheduleId)=>{
        await Schedule.destroy({where:{scheduleId}})
    }


}

module.exports = ScheduleRepository