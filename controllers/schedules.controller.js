const { date } = require('joi');
const ScheduleService = require('../services/schedules.service');
// const { redisSet } = require('../middlewares/cacheMiddleware');

class ScheduleController {
  scheduleService = new ScheduleService();

  createSchedule = async (req, res, next) => {
    try {
      let { title, description, start, end, color } = req.body;
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      console.log(
        'start::::::::::::::::::::::end:::::::::::::::::::::',
        start,
        end,
      );

      // let date = new Date(start);
      // let endDate = new Date(end);
      // start = date.setHours(date.getHours() + 9);
      // end = endDate.setHours(endDate.getHours() + 9);
      const createschedule = await this.scheduleService.createSchedule({
        title,
        description,
        start,
        end,
        color,
        userId,
        groupId,
      });

      res.status(201).json({ data: createschedule });
    } catch (error) {
      next(error);
    }
  };
  //*그냥 눌러서 수정할 때 요청 받는 곳
  updateSchedule = async (req, res, next) => {
    try {
      let { title, description, start, end, color } = req.body;
      const { scheduleId, groupId } = req.params;
      const { userId } = res.locals.user;
      console.log(start, end);
      // let date = new Date(start);
      // let endDate = new Date(end);
      // start = date.setHours(date.getHours() + 9);
      // end = endDate.setHours(endDate.getHours() + 9);
      const updateschedule = await this.scheduleService.updateSchedule({
        scheduleId,
        title,
        description,
        userId,
        groupId,
        start,
        end,
        color,
      });
      res.status(200).json({ data: updateschedule });
    } catch (error) {
      next(error);
    }
  };
  //*드래그앤드롭 시 요청받는 곳
  dragUpdateSchedule = async (req, res, next) => {
    try {
      let { title, description, start, end, color } = req.body;
      const { scheduleId, groupId } = req.params;
      const { userId } = res.locals.user;
      console.log(start, end);
      // let date = new Date(start);
      // let endDate = new Date(end);
      // start = date.setHours(date.getHours() + 9);
      // end = endDate.setHours(endDate.getHours() + 9);
      const updateschedule = await this.scheduleService.updateSchedule({
        scheduleId,
        title,
        description,
        userId,
        groupId,
        start,
        end,
        color,
      });
      res.status(200).json({ data: updateschedule });
    } catch (error) {
      next(error);
    }
  };

  findAllSchedule = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const findschedule = await this.scheduleService.findAllSchedule({
        groupId,
      });
      console.log('스케쥴만들고 보여줍니다!!!!!!!!!!', findschedule);
      // await redisSet(req.originalUrl, JSON.stringify(findschedule), 432000);
      res.status(200).json({ data: findschedule });
    } catch (error) {
      next(error);
    }
  };

  destroySchedule = async (req, res, next) => {
    try {
      const { scheduleId, groupId } = req.params;
      const { userId } = res.locals.user;
      const destroySchedule = await this.scheduleService.destroySchedule({
        scheduleId,
        groupId,
        userId,
      });
      res.status(200).json({ data: destroySchedule });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ScheduleController;
