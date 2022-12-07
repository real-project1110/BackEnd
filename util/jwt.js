const jwt =require('jsonwebtoken');
const dotenv =require('dotenv');
const UserRepository = require('../repositories/users.repository')
dotenv.config();
class jwtT {
    userRepository = new UserRepository();
// const accessToken = (member)=>{
//     return new Promise((resolve,reject)=>{
//         jwt.sign(
//             {
//                 snsId : member.id,
//                 email : member.email,
//                 nickname : member.nickname,
//             },
//             process.env.SECRET_KEY,
//         {
//             expiresIn:'1d',
//         },
//         (err,token)=>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(token)
//             }
//         }
//         )
//     })
createUser = async (email, nickname, password, avatarImg) => {
const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('가입하신 회원이 아닙니다.');
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
    await this.userRepository.refreshT(user, refreshToken);

    return { user, accessToken, refreshToken };
  };
}
module.exports = jwtT;