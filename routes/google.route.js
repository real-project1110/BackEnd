// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken')
// const passport = require('passport');
// require('dotenv').config();
// const {User} =require('../models')

// const googlecallback = (req,res,next)=>{
//     try{
//         passport.authenticate(
//             'google',
//             {failureRedirect :'/users/login'},
//             async(err, user, info)=>{
//                 if(err)return next(err);
//                 const {userId,email} = user;
//             const accessToken = jwt.sign(
//                 {userId:user.userId},
//                 process.env.SECRET_KEY,
//                 {expiresIn:'1h'}
//             );
//             console.log(accessToken)
//             const refreshToken = jwt.sign(
//                 {userId : user.userId},
//                 process.env.SECRET_KEY,
//                 {expiresIn:'14d'}
//             );
//             await User.update(
//                 {refreshToken},
//                 {where: {userId : user.userId}}
//                 );

//             result = {userId,accessToken,refreshToken,email};
//             res.status(201).json({
//                 user:result,
//                 message : '구글 로그인에 성공하셨습니다',
//             });
//             }
//         )(req,res,next);
//     }catch(error){
//     next(error);
//     }
// };

// // 로그인페이지로 이동
// router.get('/auth/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
// // 구글에서 설정한 redicrect url을 통해 요청 재전달
// router.get('/auth/google/callback', googlecallback);

// module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const google = async (req, res, next) => {
  try {
    let { authorization } = req.headers;

    const googleAccessToken = authorization;
    console.log('123123123123132', googleAccessToken);
    const userinfo = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + googleAccessToken,
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      },
    );
    console.log('22222구글유저 정보내놔', userinfo);
    let existingMember = null;
    existingMember = await User.findOne({
      where: {
        snsId: googleUser.googleId,
        provider: 'google',
      },
    });
    console.log('111111', existingMember);

    if (existingMember === null) {
      const newMember = await User.create({
        snsId: googleUser.googleId,
        nickname: googleUser.profileObj.name,
        avatarImg: googleUser.profileObj.imageUrl,
        email: googleUser.profileObj.email || null,
        provider: 'google',
      });

      // const accessToken = await generateToken(newMember);
      const accessToken = jwt.sign(
        {
          userId: newMember.userId,
          email: newMember.email,
          nickname: newMember.nickname,
          currentPage: newMember.currentPage,
          avatarImg: newMember.avatarImg,
        },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.json({
        success: true,
        accessToken,
        nickname: newMember.nickname,
      });
    } else {
      // const accessToken = await generateToken(existingMember);
      const accessToken = jwt.sign(
        {
          userId: existingMember.userId,
          email: existingMember.email,
          nickname: existingMember.nickname,
          currentPage: existingMember.currentPage,
          avatarImg: existingMember.avatarImg,
        },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.json({
        success: true,
        accessToken,
        currentPage: existingMember.currentPage,
      });
    }
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.post('/auth/google', google);
// 카카오에서 설정한 redicrect url을 통해 요청 재전달
router.get('/auth/google/callback');

module.exports = router;

