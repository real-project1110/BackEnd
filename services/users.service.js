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

    certification = async(email, certificationNum)=>{
        const checkEmail = await this.userRepository.authEmail(email);
        if(!checkEmail){
            throw new Error("email 정보가 존재하지 않습니다")
        }
        console.log('1111111111111111', certificationNum,checkEmail.certificationNum)
        if(checkEmail.certificationNum !==certificationNum){
            throw new Error("인증번호가 일치하지 않습니다")
        }
        if(checkEmail.certificationNum ===certificationNum){
            const auth = await this.userRepository.emailCheck(email)
            return {
                certificationId : auth.certificationId,
                email : auth.email,
                certificationNum : auth.certificationNum,
                certificationCheck : auth.certificationCheck
            }
        }
        // console.log('11111111',authEmail.certificationNum)

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

    changeNic = async(userId,nickname)=>{
        const changeNic = await this.userRepository.changeNic(userId,nickname)
        console.log(changeNic)
        return {
            nickname : changeNic.nickname
        }
    }

    changePw = async(userId,password,newpassword)=>{
        const user = await this.userRepository.findByUserId(userId)
        console.log('11111111',user)
        if(user.password ===newpassword){
            throw new Error('기존 비밀번호와 다르게 설정해주세요')
        }
        const comparePw = await bcrypt.compare(user.password,newpassword)
        
        console.log('22222222222222',comparePw,user.password,newpassword)
        newpassword = await bcrypt.hash(newpassword, 12)
        const changePw = await this.userRepository.changePw(userId,newpassword)
        return changePw
    }
}
module.exports = UserService;