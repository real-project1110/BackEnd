const { InvalidConnectionError } = require('sequelize');
const { User, Certification, Invite } = require('../models');
const groupList = require('../models/groupList');

class UserRepository {
  createUser = async ({ email, nickname, password, avatarImg }) => {
    const createUser = await User.create({
      email,
      nickname,
      password,
      avatarImg,
    });
    return createUser;
  };
  createInvite = async ({ userId, groupId }) => {
    const createInvite = await Invite.create({ userId, groupId });
    return createInvite;
  };

  findByUser = async ({ userId }) => {
    const findByUser = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { userId },
    });
    return findByUser;
  };
  findByEmail = async ({ email }) => {
    const findEmail = await User.findOne({ where: { email } });
    return findEmail;
  };

  refreshT = async ({ user, refreshToken }) => {
    await user.update({ refreshToken }, { where: { userId: user.userId } });
  };

  findGroupUserId = async ({ userId }) => {
    let findGroupUserId = await GroupUser.findByPk(userId);
    findGroupUserId = findGroupUserId.groupUserId;
    return findGroupUserId;
  };

  changeNic = async ({ userId, nickname }) => {
    const changeNic = await User.update(
      { nickname: nickname },
      { where: { userId } },
    );
    return changeNic;
  };

  changePw = async (userId, newpassword) => {
    const changePw = await User.update(
      { password: newpassword },
      { where: { userId } },
    );
    return changePw;
  };
  avatarImg = async ({ userId, resizeUrl }) => {
    const avatarImg = await User.update(
      { avatarImg: resizeUrl },
      { where: { userId } },
    );
    return avatarImg;
  };

  findByUserId = async (userId) => {
    const findByUserId = await User.findOne({ where: { userId } });
    return findByUserId;
  };

  // getGroupId = async(groupId)=>{
  //     const getGroupId = await groupList.findByPk(groupId)
  //     return getGroupId
  // }

  //----------------------------------------------------------------------------------
  authEmail = async (email) => {
    const authEmail = await Certification.findOne({ where: { email } });
    return authEmail;
  };

  deleteEmail = async (email) => {
    const destroyEmail = await Certification.destroy({ where: { email } });
    return destroyEmail;
  };

  emailCheck = async (email) => {
    const emailCheck = await Certification.update(
      { certificationCheck: true },
      { where: { email } },
    );
    return emailCheck;
  };
}
module.exports = UserRepository;
