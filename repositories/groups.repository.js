const { User, GroupList, GroupUser, Chat, Room } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const RoomController = require('../controllers/room.controller');
const Sequelize = Sq.Sequelize;

class GroupRepository {
  createGroup = async ({ groupUserNickname, groupName, userId, avatarImg }) => {
    const createGroup = await GroupList.create({ groupName, userId });
    const groupId = createGroup.groupId;
    const userCount = 1;
    await GroupUser.create({
      userId,
      groupId,
      groupUserNickname,
      userCount,
      groupAvatarImg: avatarImg,
    });
    return createGroup;
  };

  updateGroupName = async ({ groupId, groupName }) => {
    const updateGroupName = await GroupList.update(
      { groupName },
      { where: { groupId } },
    );
    return updateGroupName;
  };

  findOneGroup = async ({ userId, groupId, groupUserId }) => {
    const findOneGroup = await GroupList.findOne({
      where: { groupId },
      raw: true,
    });
    const findRoomId = await Room.findAll({
      where: { [Op.or]: [{ sender: groupUserId }, { receiver: groupUserId }] },
      attributes: ['roomId'],
      raw: true,
    });
    return { findOneGroup, findRoomId };
  };
  updatcurrentPage = async ({ userId, currentPage }) => {
    const updatcurrentPage = await User.update(
      { currentPage },
      { where: { userId } },
    );
    return updatcurrentPage;
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
      if (groupImg == null) {
        findGroup.push({ groupId, groupName, groupImg });
      } else {
        const originalUrl = groupImg.replace(/\/statUS\//, '/original/');
        findGroup.push({ groupId, groupName, groupImg, originalUrl });
      }
      // const originalUrl = groupImg.replace(/\/statUS\//, '/original/');=
    }
    return findGroup;
  };
  findByUser = async ({ userId }) => {
    const findByUser = await User.findOne({
      where: { userId },
    });
    return findByUser;
  };
  findGroupUser = async ({ groupId, userId }) => {
    const findGroupUser = await GroupUser.findOne({
      where: { [Op.and]: [{ groupId }, { userId }] },
    });
    return findGroupUser;
  };
  updateGroupImg = async ({ groupId, groupImg }) => {
    await GroupList.update(
      { groupImg },
      { where: { [Op.and]: [{ groupId }] } },
    );
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

  destroyGroup = async ({ groupId }) => {
    const destroyGroup = await GroupList.destroy({ where: { groupId } });
    return destroyGroup;
  };

  updateNic = async ({ userId, groupId, groupUserNickname }) => {
    const updateNic = await GroupUser.update(
      { groupUserNickname: groupUserNickname },
      { where: { userId, groupId } },
    );
    return updateNic;
  };

  updatGroupAvatarImg = async ({ groupUserId, groupId, groupAvatarImg }) => {
    const updatGroupAvatarImg = await GroupUser.update(
      { groupAvatarImg },
      { where: { [Op.and]: [{ groupId }, { groupUserId }] } },
    );
    return updatGroupAvatarImg;
  };

  getprofile = async ({ userId, groupId }) => {
    const getprofile = await GroupUser.findOne({
      where: { [Op.and]: [{ userId }, { groupId }] },
    });
    return getprofile;
  };

  getUser = async ({ userId, groupUserId }) => {
    const getUser = await GroupUser.findOne({ where: { userId, groupUserId } });
    return getUser;
  };

  findAllGU = async ({ groupId }) => {
    const findAllGU = await GroupUser.findAll({
      where: { groupId },
      order: [['groupUserId', 'desc']],
    });
    return findAllGU;
  };

  postStatus = async ({ status, statusMessage }) => {
    const poststatus = await GroupUser.create({ status, statusMessage });
    return poststatus;
  };

  updateStatus = async ({ userId, groupId, status, statusMessage }) => {
    const updatestatus = await GroupUser.update(
      { status, statusMessage },
      { where: { userId, groupId } },
    );
    return updatestatus;
  };

  createGroupUser = async ({ groupUser }) => {
    return await GroupUser.create(groupUser);
  };

  findOneId = async ({ userId }) => {
    const findOneId = await User.findOne({ where: { userId } });
    return findOneId;
  };

  groupuserdup = async ({ userId, groupId }) => {
    const groupuserdup = await GroupUser.findOne({
      where: { [Op.and]: [{ userId }, { groupId }] },
    });
    return groupuserdup;
  };

  deleteGroupUser = async ({ groupUserId }) => {
    const deletegroupuser = await GroupUser.destroy({ where: { groupUserId } });
    return deletegroupuser;
  };

  getUserId = async ({ userId, groupId }) => {
    const getUserId = await GroupUser.findOne({ where: { userId, groupId } });
    return getUserId;
  };

  findGroupLeader = async ({ groupId }) => {
    const findGroupLeader = await GroupList.findOne({ where: { groupId } });
    return findGroupLeader;
  };
}

module.exports = GroupRepository;
