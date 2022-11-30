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
      groupUserId: groupUserId,
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
    const findCreateGroupUserId =
      await this.scheduleRepository.findCreateGroupUserId({ scheduleId });
    const createGroupUserId = findCreateGroupUserId.groupUserId;
    if (groupUserId !== createGroupUserId) {
      return { message: '권한이 없습니다' };
    }
    const updateSchedule = await this.scheduleRepository.updateSchedule({
      scheduleId,
      title,
      description,
      start,
      end,
      groupUserId: groupUserId,
      color,
    });
    return updateSchedule;
  };

  findAllSchedule = async ({ groupId }) => {
    const schedule = await this.scheduleRepository.findAllSchedule({ groupId });
    return schedule;
  };

  destroySchedule = async ({ scheduleId, userId, groupId }) => {
    const findGroupUserId = await this.scheduleRepository.findGroupUserId({
      userId,
      groupId,
    });
    const groupUserId = findGroupUserId.groupUserId;
    const findCreateGroupUserId =
      await this.scheduleRepository.findCreateGroupUserId({ scheduleId });
    const createGroupUserId = findCreateGroupUserId.groupUserId;
    if (groupUserId !== createGroupUserId) {
      return { message: '권한이 없습니다' };
    }
    await this.scheduleRepository.destroySchedule({ scheduleId });
  };
}

module.exports = ScheduleService;
