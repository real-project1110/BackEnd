const { User, Certification } = require('../models');
const groupList = require('../models/groupList');

class UserRepository {
  createUser = async ({ email, nickname, password }) => {
    const createUser = await User.create({ email, nickname, password });
    return createUser;
  };
  findByUser = async ({ userId }) => {
    console.log('userId::::::::::::::repository:::::::::::::::', userId);
    await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { userId },
    });
  };
  findByEmail = async (email) => {
    const findEmail = await User.findOne({ where: { email } });
    return findEmail;
  };

  refreshT = async (user, refreshToken) => {
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
  findByUser = async ({ userId }) => {
    const findByUser = await User.findOne({ wher: { userId } });
    return findByUser;
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
