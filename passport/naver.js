// require('dotenv').config();
// const passport = require("passport");
// const Naver = require('passport-naver');
// const {User} = require("../models");

// const NaverStrategy = Naver.Strategy;

// module.exports = () => {
//     passport.use(
//         new NaverStrategy(
//         {
//             clientID: process.env.NAVER_ID,
//             clientSecret: process.env.NAVER_SECRET,
//             callbackURL:'/auth/naver/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//             // 네이버 플랫폼에서 로그인 했고 & 소셜 로그인 한 경우
//             const exUser = await User.findOne({
//                 where: {
//                     email: profile._json.email,
//                     snsId : profile.id,
//                     provider: "naver",
//                 },
//             });
//             console.log('aaaaaaaaaaaaaaaaaa',profile)
//             // console.log('1111111111111',profile._json)
//             // 이미 가입된 네이버 프로필이면 성공 덤으로 네이버 닉네임 업데이트
//             if (exUser) {
//                 await User.update(
//                     { nickname: profile._json.nickname },
//                     { where: { userId: exUser.userId } }
//                 );
//                 done(null, [exUser.userId, true]); // 로그인 인증 완료
//                 } else {
//                     // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
//                     const newUser = await User.create({
//                         email: profile._json.email,
//                         nickname: profile._json.nickname,
//                         snsId: profile.id,
//                         provider: "naver",
//                     });
//                     done(null, [newUser.dataValues.userId, false]); // 회원가입하고 로그인 인증 완료
//                     }
//                 } catch (error) {
//                     done(error);
//                 }
//             }
//         )
//     );
// };
const passport = require('passport');
const {User}=require('../models')
const naverStrategy = require('passport-naver').Strategy
require('dotenv').config();
module.exports=()=>{
    passport.use(
        new naverStrategy(
            {
                clientID : process.env.NAVER_ID,
                clientSecret : process.env.NAVER_SECRET,
                callbackURL:"/auth/naver/callback"
            },
            async(accessToken,refreshToken,profile,done)=>{
                try{
                    const exUser = await User.findOne({
                        where : {snsId:profile.id, provider : 'naver'},
                    });
                    console.log('aaaaaaaaaaaa',profile)
                    if(exUser) {
                        done(null,exUser);
                        console.log(exUser, '네이버 로그인 성공!');
                    }else{
                        const newUser = await User.create({
                            email : profile._json.email,
                            nickname : profile.nickname,
                            snsId : profile.id,
                            provider:'naver'
                        });
                        done(null,newUser);
                    }
                }catch(error){
                    done(error);
                }
            }
        )
    )
}