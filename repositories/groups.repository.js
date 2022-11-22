const { User, GroupList, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class GroupRepository {
  createGroup = async ({ groupUserNickname, groupName, userId }) => {
    const createGroup = await GroupList.create(groupName, userId);
    const groupId = createGroup.groupId;
    const userCount = 1;
    await GroupUser.create({
      userId,
      groupId,
      groupUserNickname,
      userCount,
    });
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
  findGroupUserId = async ({ userId }) => {
    const findGroupUserId = await GroupUser.findAll({ where: { userId } });
    const getGroupId = findGroupUserId.map((a) => {
      return a.groupId;
    });
    return getGroupId;
  };
  findGroup = async ({ findGroupUserId }) => {
    const findGroup = [];
    for (let i = 0; i < findGroupUserId.length; i++) {
      const find = await GroupList.findOne({
        where: { groupId: findGroupUserId[i] },
      });
      const { groupId, groupName, groupImg } = find;
      findGroup.push({ groupId, groupName, groupImg });
    }
    return findGroup;
  };
  // findGroupUser = async (userId) => {
  //   const findGroupUser = await GroupUser.findAll({ where: { userId } });
  //   const groupIds = [];
  //   for (let i in findGroupUser) {
  //     groupIds.push(findGroupUser[i].groupId);
  //   }
  //   return { groupIds };
  // };

  // findAllGroup = async (groupId) => {
  //   const findAllGroup = await GroupList.findOne({ where: { groupId } });
  //   return findAllGroup;
  // };

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

  postStatus = async (status, statusMessage) => {
    const poststatus = await GroupUser.create({ status, statusMessage });
    return poststatus;
  };

  updateStatus = async (userId, groupId, status, statusMessage) => {
    const updatestatus = await GroupUser.update(
      { status, statusMessage },
      { where: { userId, groupId } },
    );
    return updatestatus;
  };

  createGroupUser = async (groupUser) => {
    console.log('안녕', groupUser);
    return await GroupUser.create(groupUser);
  };

  findOneId = async (userId) => {
    const findOneId = await User.findByPk(userId);
    return findOneId;
  };

  groupuserdup = async (userId, groupId) => {
    const groupuserdup = await GroupUser.findOne({
      where: { userId, groupId },
    });
    return groupuserdup;
  };
}

module.exports = GroupRepository;
