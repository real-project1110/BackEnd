const ScheduleRepository = require('../repositories/schedules.repository');

class ScheduleService {
  scheduleRepository = new ScheduleRepository();

  createSchedule = async ({
    title,
    description,
    start,
    end,
    color,
    userId,
    groupId,
  }) => {
    const findGroupUserId = await this.scheduleRepository.findGroupUserId({
      userId,
      groupId,
    });
    const groupUserId = findGroupUserId.groupUserId;
    await this.scheduleRepository.createSchedule({
      title,
      description,
      start,
      end,
      color,
      groupUserId,
      groupId,
    });
    return { message: '일정이 생성되었습니다.' };
  };

  updateSchedule = async ({
    scheduleId,
    title,
    description,
    userId,
    groupId,
    start,
    end,
    color,
  }) => {
    const findGroupUserId = await this.scheduleRepository.findGroupUserId({
      userId,
      groupId,
    });
    const groupUserId = findGroupUserId.groupUserId;
    const updateSchedule = await this.scheduleRepository.updateSchedule({
      scheduleId,
      title,
      description,
      start,
      end,
      groupUserId,
      color,
    });
    return updateSchedule;
  };

  findAllSchedule = async ({ groupId }) => {
    const schedule = await this.scheduleRepository.findAllSchedule({ groupId });
    return schedule;
  };

  destroySchedule = async ({ scheduleId }) => {
    await this.scheduleRepository.destroySchedule({ scheduleId });
  };
}

module.exports = ScheduleService;
