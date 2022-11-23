const { object } = require('joi');
const { Invite, GroupList, User } = require('../models');

class InviteRepository {
  findUser = async (email) => {
    const findUser = [];
    for (let i = 0; i < email.length; i++) {
      const find = await User.findOne({ where: { email: email[i] } });
      const { userId } = find;
      findUser.push(userId);
    }
    return findUser;
  };
  createInvite = async ({ findUser, groupId }) => {
    for (let i = 0; i < findUser.length; i++) {
      await Invite.create({ userId: findUser[i], groupId });
    }
    // const { userId } = await User.findOne({ where: { email } });
    // const { groupName, groupImg } = await GroupList.findOne({
    //   where: { groupId },
    // });
    // await Invite.create({ userId, groupId, groupName, groupImg });
  };
  findGroup = async (userId) => {
    const findGroup = [];
    const find = await Invite.findAll({ where: userId });
    for (let i = 0; i < find.length; i++) {
      findGroup.push(find[i].groupId);
    }
    return findGroup;
  };
  findInvite = async ({ userId, findGroup }) => {
    const group = [];
    const invite = await Invite.findAll({ where: { userId } });
    for (let i = 0; i < findGroup.length; i++) {
      const groupFind = await GroupList.findByPk({ groupId: findGroup[i] });
      const { groupName, groupImg } = groupFind;
      group.push({ ...invite[i], groupName, groupImg });
      //   Object.assign(invite[i], { groupName, groupImg });
    }
    console.log(group);
    return group;
  };
}

module.exports = InviteRepository;
