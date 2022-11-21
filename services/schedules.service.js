const ScheduleRepository = require('../repositories/schedules.repository')

class ScheduleService {
    scheduleRepository = new ScheduleRepository()

    createSchedule = async(title,description,start,end,colorId,groupUserId,groupId)=>{
        
        await this.scheduleRepository.createSchedule(title,description,start,end,colorId,groupUserId,groupId)
        return {message:"일정이 생성되었습니다."}
    }

    updateSchedule =async(title,description,start,end,colorId,scheduleId)=>{
        await this.ScheduleRepository.updateSchedule(title,description,start,end,colorId,scheduleId)
        return {message:"수정이 완료되었습니다."}
    }

    findAllSchedule = async()=>{
        await this.ScheduleRepository.findAllSchedule()
        return {message:"검색이 완료되었습니다."}
    }

    destroySchedule = async (scheduleId)=>{
        await this.ScheduleRepository.destroySchedule(scheduleId)
    }
}

module.exports = ScheduleService