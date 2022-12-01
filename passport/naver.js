// const passport = require('passport');
// const { User } = require('../models');
// const naverStrategy = require('passport-naver').Strategy;
// require('dotenv').config();
// module.exports = () => {
//   passport.use(
//     new naverStrategy(
//       {
//         clientID: process.env.NAVER_ID,
//         clientSecret: process.env.NAVER_SECRET,
//         callbackURL: '/auth/naver/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const exUser = await User.findOne({
//             where: { snsId: profile.id, provider: 'naver' },
//           });
//           if (exUser) {
//             done(null, exUser);
//             console.log(exUser, '네이버 로그인 성공!');
//           } else {
//             const newUser = await User.create({
//               email: profile._json.email,
//               nickname: profile.nickname,
//               snsId: profile.id,
//               provider: 'naver',
//             }
//             done(null, newUser);
//           }
//         } catch (error) {
//           done(error);
//         }
//       },
//     ),
//   );
// };
