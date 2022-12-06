const { Schedule, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class ScheduleRepository {
  findGroupUserId = async ({ userId, groupId }) => {
    const groupuser = await GroupUser.findOne({
      where: { [Op.and]: [{ userId }, { groupId }] },
    });
    return groupuser;
  };
  createSchedule = async ({
    title,
    description,
    start,
    end,
    color,
    groupUserId,
    groupId,
  }) => {
    await Schedule.create({
      title,
      description,
      start,
      end,
      color,
      groupUserId,
      groupId,
    });
  };

  updateSchedule = async ({
    scheduleId,
    title,
    description,
    start,
    end,
    color,
    groupUserId,
  }) => {
    const updateSchedule = await Schedule.update(
      { title, description, start, end, color },
      { where: { [Op.and]: [{ scheduleId }, { groupUserId }] } },
    );
    return updateSchedule;
  };

  findAllSchedule = async ({ groupId }) => {
    const findAllSchedule = await Schedule.findAll({ where: { groupId } });
    const data = findAllSchedule.map((schedule) => {
      return {
        ...schedule,
        start: new Date(+schedule.start),
        end: new Date(+schedule.end),
      };
    });
    return data;
  };

  destroySchedule = async ({ scheduleId }) => {
    await Schedule.destroy({ where: { scheduleId } });
  };

  findCreateGroupUserId = async ({ scheduleId }) => {
    const findCreateGroupUserId = await Schedule.findOne({
      where: { scheduleId },
    });
    return findCreateGroupUserId;
  };
}

module.exports = ScheduleRepository;
