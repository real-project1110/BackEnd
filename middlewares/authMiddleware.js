require('dotenv').config();
const jwt = require('jsonwebtoken');
const {User} = require('../models');

module.exports = async(req,res,next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if(!accessToken){
            throw new Error ('로그인 후 사용하세요');
        }
        
        let accessValidate = null;
        let refreshValidate = null;

        try{
            accessValidate =jwt.verify(accessToken, process.env.SECRET_KEY);
        }catch(error){
            accessValidate = null;
        }

        try{
            refreshValidate = jwt.verify(refreshToken,process.env.SECRET_KEY);
        }catch(error){
            refreshValidate=null;
        }

        try{
            if(!accessValidate && !refreshValidate){
                throw new Error('로그인 기한이 만료되었습니다')
            }

            if(!accessValidate && refreshValidate){
                const user = await User.findOne({where:{refreshToken : refreshToken}})

            if(!user) {
                throw new Error('로그인 기한이 만료되었습니다')
            }

            const userId = user?.userId

            const newAccess =jwt.sign({userId},process.env.SECRET_KEY,{
                expiresIn : '1h',
            });
            console.log(newAccess, 'accessToken 재발급');

            return res.status(201).json({
                accessToken : newAccess,
                refreshToken : refreshToken,
                message : 'accessToken이 재발급 되었습니다',
            })
        }
            if(accessValidate && !refreshValidate){
                const {userId} = accessValidate;
                const user = await User.findOne({where:{userId}});
                if(!user){
                    throw new Error('로그인 기한이 만료되었습니다')
                }

                const newRefresh = jwt.sign({userId},process.env.SECRET_KEY,{
                    expiresIn:'14d',
                });
                console.timeLog(newRefresh,'refreshToken 재발급');

                await User.update(
                    {refreshToken:newRefresh},
                    {where : {userId}}
                );
            }

            if(accessValidate && refreshValidate){
                const{userId}=accessValidate;
                User.findOne({
                    where:{userId},
                    attributes: ['userId','email','nickname'],
                }).then((user)=>{
                    res.locals.user = user;
                    res.locals.accessToken = accessToken;
                    next();
                });
            }
        }catch(error){
            next(error);
        }
    }catch(error){
        next(error);
    }
}