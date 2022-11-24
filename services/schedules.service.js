const ScheduleRepository = require('../repositories/schedules.repository');

class ScheduleService {
  scheduleRepository = new ScheduleRepository();

  findGroupUserId = async (userId, groupId) => {
    return await this.scheduleRepository.findGroupUserId(userId, groupId);
  };

  createSchedule = async (
    title,
    description,
    start,
    end,
    color,
    userId,
    groupId,
  ) => {
    const findGroupUserId = await this.findGroupUserId(userId, groupId);
    const groupUserId = findGroupUserId;
    await this.scheduleRepository.createSchedule(
      title,
      description,
      start,
      end,
      color,
      groupUserId,
      groupId,
    );
    return { message: '일정이 생성되었습니다.' };
  };

  updateSchedule = async (
    scheduleId,
    title,
    description,
    start,
    end,
    color,
    groupId,
    userId,
  ) => {
    const findGroupUserId = await this.findGroupUserId(userId, groupId);
    const groupUserId = findGroupUserId;
    await this.scheduleRepository.updateSchedule(
      scheduleId,
      title,
      description,
      start,
      end,
      groupUserId,
      color,
    );
    return { message: '수정이 완료되었습니다.' };
  };

  findAllSchedule = async (groupId) => {
    const schedule = await this.scheduleRepository.findAllSchedule(groupId);
    return schedule;
  };

  destroySchedule = async (scheduleId) => {
    await this.scheduleRepository.destroySchedule(scheduleId);
  };
}

module.exports = ScheduleService;
