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
    console.log(
      '여기요살려주세요사라졌어요실종이예요제발요',
      title,
      description,
      start,
      end,
      color,
    );
    const updateSchedule = await Schedule.update(
      { title, description, start, end, color },
      { where: { [Op.and]: [{ scheduleId }, { groupUserId }] } },
    );
    console.log(
      '여기요제발요봐주세요여기오제발요봐주세요 여기요',
      updateSchedule,
    );
    return updateSchedule;
  };

  findAllSchedule = async ({ groupId }) => {
    const findAllSchedule = await Schedule.findAll({ where: { groupId } });
    return findAllSchedule;
  };

  destroySchedule = async ({ scheduleId }) => {
    await Schedule.destroy({ where: { scheduleId } });
  };
}

module.exports = ScheduleRepository;
