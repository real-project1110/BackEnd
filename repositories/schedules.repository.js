const {Schedule} = require('../models')

class ScheduleRepository{

    createSchedule = async (title,description,start,end,colorId,groupUserId,groupId)=>{
        await Schedule.create({title,description,start,end,colorId,groupUserId,groupId})
    };

    updateSchedule = async (title,description,start,end,colorId,scheduleId)=>{
        await Schedule.upadte({title,description,start,end,colorId},{where:{scheduleId}})
    }

    findAllSchedule = async (groupId)=>{
        console.log(groupId)
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