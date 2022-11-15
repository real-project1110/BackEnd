const {User,Certification} = require('../models');
const certification = require('../models/certification');
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

    findGroupUserId = async ({ userId }) => {
        let findGroupUserId = await GroupUser.findByPk(userId);
        findGroupUserId = findGroupUserId.groupUserId;
        return findGroupUserId
    };

    //----------------------------------------------------------------------------------
    authEmail = async(email)=>{
        const authEmail = await Certification.findByPk(email)
        return authEmail;
    }
    
    deleteEmail = async(email)=>{
        const destroyEmail = await Certification.destroy(
            {where:{email}})
        return destroyEmail;
    }
}
module.exports = UserRepository