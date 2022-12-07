// const SocialRepository = require('../repositories/socials.repository');

// class SocialService{
//     socialRepository = new SocialRepository

//     createUser = async({email,nickname,avatarImg,provider})=>{
//         const user = await this.socialRepository.createUser({email,nickname,avatarImg,provider})
//         if(user){
//             throw new Error("이미 가입한 회원입니다")
//         }
//         return {
//             email : user.email,
//             nickname : user.nickname,
//             avatarImg : user.avatarImg,
//             provider : user.provider
//         }
//     }
// }
// module.exports = SocialService;