const {User} = require('../models');
class UserRepository{
    createUser = async ({email,nickname,password})=>{
        const createUser = await User.create({email,nickname,password})
        return createUser
    }
    findByUser = async(userId) =>{
        return User.findOne({
            attributes :{
                exclude:['password'],
            },
            where:{userId}
        })
    }
    findByEmail = async (email)=>{
        const findEmail = await User.findOne({where :{email}})
        return findEmail;
    }

    refreshT = async(user,refreshToken)=>{
        await user.update({refreshToken},{where : {userId :user.userId}})
    }
}
module.exports = UserRepository