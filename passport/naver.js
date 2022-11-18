// require('dotenv').config();
// const passport = require('passport');
// const naverStrategy = require('passport-naver-v2').Strategy
// const {User} = require('../models');

// //네이버 로그인
// module.exports = () =>{
//     passport.use(
//         new naverStrategy(
//             {
//                 clientId : process.env.NAVER_ID,
//                 clientSecret : process.env.NAVER_SECRET,
//                 callbackURL:'/auth/naver/callback',
//             },
//             async(accessToken,refreshToken,profile,done)=>{
//                 try{
//                     const exUser = await User.findOne({
//                         where:{snsId:profile.id,provider:'naver'},
//                     })
//                     console.log(profile._json)
//                     if(exUser){
//                         done(null, exUser);
//                     }else{
//                         const newUser = await User.create({
//                             email : profile._json.email,
//                             nickname : profile._json.name,
//                             snsId : profile.id,
//                             provider:'naver',
//                         })
//                         done(null,newUser)
//                     }
//                 }catch(error){
//                     done(error)
//                 }
//             }
//         )
//     )
// }