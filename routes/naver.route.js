// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken')
// const passport = require('passport');
// require('dotenv').config();
// const {User} =require('../models')

// const navercallback = (req,res,next)=>{
//     try{
//         passport.authenticate(
//             'naver',
//             {failureRedirect :'/users/login'},
//             async(err , user, info)=>{
//                 if(err)return next(err)
//                 const {userId,email} = user;

//                 const accessToken = jwt.sign(
//                     {userId:user.userId},
//                     process.env.SECRET_KEY,
//                     {expiresIn:'1h'}
//                 );
//                 console.log(accessToken)
//                 const refreshToken = jwt.sign(
//                     {userId:user.userId},
//                     process.env.SECRET_KEY,
//                     {expiresIn:'14d'}
//                 );
//                 await User.update({refreshToken},
//                     {where:{userID :user.userId}}
//                     );
                
//                 result ={userId,accessToken,refreshToken,email};
//                 res.status(201).json({
//                     user:result,
//                     message:'네이버 로그인에 성공하셨습니다',
//                 });
            
//             }
//         )(req,res,next);
//     }catch(error){
//         next(error);
//     }
// };

// router.get('/auth/naver',passport.authenticate('naver'))
// router.get('/auth/naver/callback',navercallback);

// module.exports = router;