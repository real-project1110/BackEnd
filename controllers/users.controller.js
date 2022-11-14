const UserService = require('../services/users.service')
const bcrypt = require('bcrypt')
const Joi = require('../util/joi')

class UserController{
    userService = new UserService();

    //회원가입
    signup = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, nickname, password } =
        await Joi.signupSchema.validateAsync(req.body);

        if (!email || !nickname || !password) {
        return res.status(400).send({
        message: '모든 항목을 기입해주세요',
        });
    }

        if (nickname.includes(password) || password.includes(nickname)) {
        return res.status(400).send({
        message: '이름과 비밀번호를 다른형식으로 설정해주세요',
        });
    }

        const hashed = await bcrypt.hash(password,12)
        const users = await Object.create({
            email : email,
            nickname : nickname,
            password : hashed,
        }) 
        await this.userService.createUser(users);
            res.status(201).json({ message: '회원가입에 성공하셨습니다.' });
    } catch (error) {
        next(error);
    }
    }

    login =async(req,res,next)=>{
        try{
            const {email,password}=await Joi.loginSchema.validateAsync(req.body);
            const user = await this.userService.userLogin(email,password);

            res.cookie('accessToken',user.accessToken)
            res.cookie('refreshToken',user.refreshToken)
            res.status(200).json({
                userId : user.user.userId,
                nickname : user.user.nickname,
                accessToken:user.accessToken,
                refreshToken : user.refreshToken
            })
            console.log(user.user.userId,user.user.nicknmae,user.accessToken,user.refreshToken)
        }catch(error){
            next(error);
        }
    }

    // //email 중복검사
    // emailCheck = async (req,res,next)=>{
    //     try{
    //         const {email} = req.body;
    //         const emailCheck = await this.userService.emailDuplicate(email);   
    //         if(emailCheck){
    //             throw new Error('이미 등록된 이메일입니다')
    //         }
    //         res.status(200).send({message: '사용가능한 이메일입니다'})
    //     }catch(error){
    //     next(error);
    //     }
    // }

}
module.exports = UserController;
