const ScheduleService = require('../services/schedules.service');

class ScheduleController {
  scheduleService = new ScheduleService();

  createSchedule = async (req, res, next) => {
    try {
      const { title, description, start, end, color, groupUserId } = req.body;
      const { groupId } = req.params;
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
        groupUserId,
        groupId,
      );
      res.status(201).json({ data: createschedule });
    } catch (err) {
      next(err);
    }
  };

  updateSchedule = async (req, res) => {
    try {
      const { title, description, start, end, color, groupUserId, groupId } =
        req.body;
      const { scheduleId } = req.params;
      const updateschedule = await this.scheduleService.updateSchedule(
        scheduleId,
        title,
        description,
        start,
        end,
        color,
        groupId,
      );
      res.status(200).json({ data: updateschedule });
    } catch (err) {
      res.status(400).json(err);
    }
  };

  findAllSchedule = async (req, res) => {
    try {
      const { groupId } = req.params;
      const findschedule = await this.scheduleService.findAllSchedule(groupId);
      res.status(200).json({ data: findschedule });
    } catch (err) {
      res.status(400).json(err);
    }
  };

  findOneSchedule = async (req, res) => {
    try {
      const { groupId, scheduleId } = req.body;
      const findschedule = await this.scheduleService.findOneSchedule(
        scheduleId,
        groupId,
      );
      res.status(200).json({ data: findschedule });
    } catch (err) {
      res.status(400).json(err);
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
