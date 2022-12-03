const express = require('express');
const router = express.Router();
const axios = require('axios');
// const generateToken = require('../util/jwt')

const jwt = require('jsonwebtoken');
// const passport = require('passport');
require('dotenv').config();
const { User } = require('../models');
// // const SocialController = require('../controllers/socials.controller');
// // const socialController = new SocialController();

// const kakaoCallback = (req, res, next) => {
//   try {
//     passport.authenticate(
//       'kakao',
//       { failureRedirect: '/users/login' },
//       async (err, user, info) => {
//         if (err) return next(err);
//         const { userId, email } = user;

//         const accessToken = jwt.sign(
//           { userId: user.userId },
//           process.env.SECRET_KEY,
//           { expiresIn: '1h' },
//         );
//         const refreshToken = jwt.sign(
//           { userId: user.userId },
//           process.env.SECRET_KEY,
//           { expiresIn: '14d' },
//         );

//         await User.update({ refreshToken }, { where: { userId: user.userId } });

//         result = { userId, accessToken, refreshToken, email };
//         res.status(201).json({
//           user: result,
//           message: '카카오톡으로 로그인하셨습니다',
//         });
//       },
//     )(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// };

// // router.post('/users/signup/post',socialController.kakaosignup)

// // 로그인페이지로 이동
// router.get(
//   '/auth/kakao',
//   passport.authenticate('kakao', {
//     scope: ['profile_nickname', 'account_email','profile_image'],
//   }),
// );
// // 카카오에서 설정한 redicrect url을 통해 요청 재전달
// router.get('/auth/kakao/callback', kakaoCallback);

// module.exports = router;
const kakao = async (req, res, next) => {
  // const { code } = req.query;
  try {
    // const
    // {
    //   data}
    //   = axios('https://kauth.kakao.com/oauth/token', {
    //   params: {
    //     grant_type: 'authorization_code',
    //     clientID: process.env.KAKAO_ID,
    //     callbackURL: 'https://hyunjin9603.shop/auth/kakao/callback' + '?platform=kakao',
    //     code: code,
    //   },
    // });
    // console.log('1111111111',data)
    let { authorization } = req.headers;
    console.log('11111111111', authorization);
    // const [authType,kakaoAccessToken] = (authorization||'').split(' ');

    const kakaoAccessToken = authorization;

    const { data: kakaoUser } = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      },
    ); //유저 정보를 받아온다

    console.log('22222222222222', kakaoUser);
    let existingMember = null;
    existingMember = await User.findOne({
      where: {
        snsId: kakaoUser.id,
        provider: 'kakao',
      },
    });

    if (existingMember === null) {
      const newMember = await User.create({
        snsId: kakaoUser.id,
        nickname: kakaoUser.properties.nickname,
        avatarImg: kakaoUser.properties.profile_image,
        email: kakaoUser.kakao_account.email || null,
        provider: 'kakao',
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
router.post('/auth/kakao', kakao);
// 카카오에서 설정한 redicrect url을 통해 요청 재전달
router.get('/auth/kakao/callback');

module.exports = router;
