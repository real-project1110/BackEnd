const { User,GroupList, GroupUser } = require('../models');

class GroupRepository {
  createGroup = async (groupName, userId) => {
    return await GroupList.create({ groupName, userId });
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

  findGroupUser = async(userId)=>{
    const findGroupUser = await GroupUser.findAll({where:{userId}})
    const groupIds=[]
    for (let i in findGroupUser){
      groupIds.push(findGroupUser[i].groupId)
    }
    return {groupIds}
  }

  findAllGroup = async (gorupId) => {
    const findAllGroup = await GroupList.findOne({where:{gorupId}});
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

  postStatus = async (status,statusMessage)=>{
    const poststatus = await GroupUser.create({status,statusMessage})
    return poststatus;
  }

  updateStatus = async(userId,groupId,status,statusMessage)=>{
    const updatestatus = await GroupUser.update(
      {status,statusMessage},
      {where:{userId,groupId}}
    )
    return updatestatus;
  }

  createGroupUser = async(groupUser)=>{

    console.log('안녕',groupUser)
    return await GroupUser.create(groupUser)
  }

  findOneId = async(userId)=>{
    const findOneId = await User.findByPk(userId);
    return findOneId
  }
}

module.exports = GroupRepository;
