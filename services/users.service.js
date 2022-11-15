const UserRepository = require('../repositories/users.repository')
require('dotenv').config();
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authEmail = require("../util/nodeMailer");

class UserService {
    userRepository = new UserRepository();
    
    createUser = async (email,nickname,password) =>{
        const user = await this.userRepository.createUser(email,nickname,password)
        console.log(user)
        return{
            email: user.email,
            nickname : user.nickname,
            password : user.password
        }
    }
    
    userLogin = async(email,password)=>{
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new Error('가입하신 회원이 아닙니다.');
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('비밀번호가 다릅니다.');
        }
        const accessToken = jwt.sign(
            {userId : user.userId, email:user.email, nickname:user.nickname},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );
        const refreshToken = jwt.sign(
            {userId: user.userId, email:user.email, nickname:user.nickname},
            process.env.SECRET_KEY,
            {expiresIn: '14d'}    
        );
        console.log(accessToken, 'accessToken');
        console.log(refreshToken,'refreshToken');
        await this.userRepository.refreshT(user,refreshToken)
        
        return {user,accessToken,refreshToken};
    }

    emailCheck = async(email)=>{
        const emailDuplicate = await this.userRepository.findByEmail(email);
        if(emailDuplicate){
            throw new Error('이미 가입된 이메일입니다.');
        }
        const emailVerified = await this.userRepository.authEmail(email);
        if(emailVerified){
            await this.userRepository.deleteEmail(email)
        }
        authEmail(email)
    }

    myprofile = async(userId)=>{
        const myprofile = await this.userRepository.findByUser(userId)
        if(!myprofile)
        throw new Error('가입되지 않은 회원입니다.')
        return {
            userId : myprofile.userId,
            email : myprofile.email,
            nickname : myprofile.nickname,
            avatarImg : myprofile.avatarImg,
            currentPage : myprofile.currentPage
        }
    }

}
module.exports = UserService;