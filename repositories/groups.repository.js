
const { GroupList, GroupUser } = require('../models');

class GroupRepository {
  createGroup = async (groupName, groupImg) => {
    await GroupList.create({ groupName, groupImg });
  };

  updateGroupName = async (groupId, groupName) => {
    await GroupList.update({ groupName }, { where: { groupId } });
  };

  updateGroupImg = async (groupId, groupImg) => {
    await GroupList.update({ groupImg }, { where: { groupId } });
  };

  findOneGroup = async (groupId) => {
    const findOneGroup = await GroupList.findOne({ where: { groupId } });
    return findOneGroup;
  };

  findAllGroup = async () => {
    const findAllGroup = await GroupList.findAll();
    return findAllGroup;
  };

  destroyGroup = async (groupId) => {
    await GroupList.destroy({ where: { groupId } });
  };

  updateNic = async (userId, groupId, groupUserNickname) => {
    const updateNic = await GroupUser.update(
      { groupUserNickname: groupUserNickname },
      { where: { userId, groupId } },
    );
    return updateNic;
  };

  getprofile = async (userId, groupId) => {
    const getprofile = await GroupUser.findOne({ where: { userId, groupId } });
    return getprofile;
  };

  getUser = async (userId, groupUserId) => {
    const getUser = await GroupUser.findOne({ where: { userId, groupUserId } });
    return getUser;
  };

  findAllGU = async (userId, groupId) => {
    const findAllGU = await GroupUser.findAll({
      where: { [Op.and]: [{ userId }, { groupId }] },
      order: [['groupUserId', 'desc']],

    });
    return findAllGU;
  };
}

module.exports = GroupRepository;
