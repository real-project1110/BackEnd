const { Schedule, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class ScheduleRepository {
  findGroupUserId = async (userId, groupId) => {
    const groupuser = await GroupUser.findOne({
      where: { [Op.and]: [{ userId }, { groupId }] },
    });
    return groupUserId;
  };
  createSchedule = async (
    title,
    description,
    start,
    end,
    color,
    groupUserId,
    groupId,
  ) => {
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

  updateSchedule = async (
    scheduleId,
    title,
    description,
    start,
    end,
    color,
    groupUserId,
  ) => {
    await Schedule.update(
      { title, description, start, end, color },
      { where: { [Op.and]: [{ scheduleId }, { groupUserId }] } },
    );
  };

  findAllSchedule = async (groupId) => {
    const findAllSchedule = await Schedule.findAll({ where: { groupId } });
    return findAllSchedule;
  };

  destroySchedule = async (scheduleId) => {
    await Schedule.destroy({ where: { scheduleId } });
  };
}

module.exports = ScheduleRepository;
