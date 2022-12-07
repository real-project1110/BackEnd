const UserRepository = require('../repositories/users.repository');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authEmail = require('../util/nodeMailer');
const ValidationError = require('../exceptions/index.exception');

class UserService {
  userRepository = new UserRepository();

  createUser = async ({ users }) => {
    const user = await this.userRepository.createUser({
      email: users.email,
      nickname: users.nickname,
      password: users.password,
      avatarImg: users.avatarImg,
    });
    await this.userRepository.createInvite({
      userId: user.userId,
      groupId: 13,
    });
    return {
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    };
  };

  userLogin = async ({ email, password }) => {
    const user = await this.userRepository.findByEmail({ email });
    if (!user) {
      throw new Error('가입하신 회원이 아닙니다.');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('비밀번호가 다릅니다.');
    }
    const accessToken = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        currentPage: user.currentPage,
        avatarImg: user.avatarImg,
      },
      process.env.SECRET_KEY,
      { expiresIn: '7d' },
    );
    const refreshToken = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        currentPage: user.currentPage,
        avatarImg: user.avatarImg,
      },
      process.env.SECRET_KEY,
      { expiresIn: '14d' },
    );
    await this.userRepository.refreshT({ user, refreshToken });

    return { user, accessToken, refreshToken };
  };

  emailCheck = async ({ email }) => {
    const emailDuplicate = await this.userRepository.findByEmail({ email });
    if (emailDuplicate) {
      throw new Error('이미 가입된 이메일입니다.');
    }
    const emailVerified = await this.userRepository.authEmail({ email });
    if (emailVerified) {
      await this.userRepository.deleteEmail({ email });
    }
    authEmail(email);
  };

  certification = async ({ email, certificationNum }) => {
    const checkEmail = await this.userRepository.authEmail({ email });
    if (!checkEmail) {
      throw new Error('email 정보가 존재하지 않습니다');
    }
    if (checkEmail.certificationNum !== certificationNum) {
      throw new Error('인증번호가 일치하지 않습니다');
    }
    if (checkEmail.certificationNum === certificationNum) {
      const auth = await this.userRepository.emailCheck({ email });
      return {
        certificationId: auth.certificationId,
        email: auth.email,
        certificationNum: auth.certificationNum,
        certificationCheck: auth.certificationCheck,
      };
    }
  };

  myprofile = async ({ userId }) => {
    const myprofile = await this.userRepository.findByUser({ userId });
    if (!myprofile) throw new Error('가입되지 않은 회원입니다.');
    const image = myprofile.avatarImg;
    if (image == null) {
      return {
        userId: myprofile.userId,
        email: myprofile.email,
        nickname: myprofile.nickname,
        avatarImg: myprofile.avatarImg,
        currentPage: myprofile.currentPage,
      };
    } else {
      const originalUrl = image.replace(/\/statUS\//, '/original/');
      return {
        userId: myprofile.userId,
        email: myprofile.email,
        nickname: myprofile.nickname,
        avatarImg: myprofile.avatarImg,
        currentPage: myprofile.currentPage,
        originalUrl,
      };
    }
  };
  avatarImg = async ({ userId, resizeUrl }) => {
    const findByUser = await this.userRepository.findByUser({ userId });
    if (!findByUser) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const avatarImg = await this.userRepository.avatarImg({
      userId,
      resizeUrl,
    });
    return avatarImg;
  };

  changeNic = async ({ userId, nickname }) => {
    const changeNic = await this.userRepository.changeNic({ userId, nickname });

    return {
      nickname: changeNic.nickname,
    };
  };

  changePw = async (userId, password, newpassword) => {
    const user = await this.userRepository.findByUserId(userId);
    if (user.password === newpassword) {
      throw new Error('기존 비밀번호와 다르게 설정해주세요');
    }
    const comparePw = await bcrypt.compare(user.password, newpassword);

    newpassword = await bcrypt.hash(newpassword, 12);
    const changePw = await this.userRepository.changePw(userId, newpassword);
    return changePw;
  };
}
module.exports = UserService;
