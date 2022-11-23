const { date } = require('joi');
const ScheduleService = require('../services/schedules.service');

class ScheduleController {
  scheduleService = new ScheduleService();

  createSchedule = async (req, res, next) => {
    try {
      let { title, description, start, end, color } = req.body;
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      let date = new Date(start);
      let endDate = new Date(end);
      start = date.setHours(date.getHours() + 9);
      end = endDate.setHours(endDate.getHours() + 9);
      // const {user}=res.locals
      // const userId = user.userId
      // const {groupId}=req.params
      // const {groupUserId} = await this.scheduleService.findGroupUserId(userId,groupId)
      const createschedule = await this.scheduleService.createSchedule(
        title,
        description,
        start,
        end,
        color,
        userId,
        groupId,
      );
      res.status(201).json({ data: createschedule });
    } catch (error) {
      next(error);
    }
  };

  updateSchedule = async (req, res, next) => {
    try {
      let { title, description, start, end, color } = req.body;
      const { scheduleId } = req.params;
      const { userId } = res.locals.user;
      let date = new Date(start);
      let endDate = new Date(end);
      start = date.setHours(date.getHours() + 9);
      end = endDate.setHours(endDate.getHours() + 9);
      const updateschedule = await this.scheduleService.updateSchedule(
        scheduleId,
        title,
        description,
        userId,
        start,
        end,
        color,
      );
      res.status(200).json({ data: updateschedule });
    } catch (error) {
      next(error);
    }
  };

  findAllSchedule = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const findschedule = await this.scheduleService.findAllSchedule(groupId);
      res.status(200).json({ data: findschedule });
    } catch (error) {
      next(error);
    }
  };

  destroySchedule = async (req, res, next) => {
    try {
      const { scheduleId } = req.params;
      const destroySchedule = await this.scheduleService.destroySchedule(
        scheduleId,
      );
      res.status(200).json({ data: destroySchedule });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ScheduleController;
