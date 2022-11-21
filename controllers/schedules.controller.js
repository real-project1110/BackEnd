const ScheduleService = require('../services/schedules.service')

class ScheduleController{
    scheduleService = new ScheduleService()

    createSchedule = async(req,res)=>{
        try{
        const {title,description,start,end,colorId,groupUserId,groupId}= req.body
        
        const createschedule = await this.scheduleService.createSchedule(title,description,start,end,colorId,groupUserId,groupId)
        res.status(201).json({data:createschedule})
        }catch(err){
            res.status(400).json(err)
        }
    }

    updateSchedule = async(req,res)=>{
        try{
        const {scheduleId} = req.params
        const {title,description,start,end,colorId} = req.body
        const updateschedule = await this.scheduleService.updateSchedule(title,description,start,end,colorId,scheduleId)
        res.status(200).json({data:updateschedule})
        }catch(err){
            res.status(400).json(err)
        }
    }

    findAllSchedule = async(req,res)=>{
        try{
            const findschedule = await this.scheduleService.findAllSchedule()
            res.status(200).json({data:findschedule})
        }catch(err){
            res.status(400).json(err)
        }
    }

    destroySchedule = async(req,res)=>{
        try{
            const {scheduleId} = req.params
            const destroySchedule= await this.scheduleService.destroySchedule(scheduleId)
            res.status(200).json({data:destroySchedule})
        }catch(err){
            res.status(400).json(err)
        }
    }
}

module.exports = ScheduleController