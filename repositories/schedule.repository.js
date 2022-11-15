const {Schedule} = require('../models')

class ScheduleRepository{

    createSchedule = async (title,description,start,end,colorId)=>{
        await Schedule.create({title,description,start,end,colorId})
    };

    updateSchedule = async (title,description,start,end,colorId,scheduleId)=>{
        await Schedule.upadte({title,description,start,end,colorId},{where:{scheduleId}})
    }

    findAllSchedule = async ()=>{
        const findAllSchedule = await Schedule.findAll()
        return findAllSchedule
    }

    destroySchedule = async (scheduleId)=>{
        await Schedule.destroy({where:{scheduleId}})
    }


}

module.exports = ScheduleRepository