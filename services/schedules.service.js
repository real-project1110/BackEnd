const ScheduleRepository = require('../repositories/schedules.repository')

class ScheduleService {
    scheduleRepository = new ScheduleRepository()

    createSchedule = async(title,description,start,end,colorId,groupUserId,groupId)=>{
        
        await this.scheduleRepository.createSchedule(title,description,start,end,colorId,groupUserId,groupId)
        return {message:"일정이 생성되었습니다."}
    }

    updateSchedule =async(title,description,start,end,colorId,scheduleId)=>{
        await this.scheduleRepository.updateSchedule(title,description,start,end,colorId,scheduleId)
        return {message:"수정이 완료되었습니다."}
    }

    findAllSchedule = async(groupId)=>{
        console.log(2)
        const schedule=await this.scheduleRepository.findAllSchedule(groupId)
        return schedule
    }

    
    findOneSchedule = async(groupId,scheduleId)=>{
        const schedule=await this.scheduleRepository.findOneSchedule(scheduleId,groupId)
        return schedule
    }


    destroySchedule = async (scheduleId)=>{
        await this.scheduleRepository.destroySchedule(scheduleId)
    }
}

module.exports = ScheduleService