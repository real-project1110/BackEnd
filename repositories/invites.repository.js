const {Invite,GroupList,User} = require('../models')

class InviteRepository{

    createInvite = async(email,groupId)=>{
        const {userId} = await User.findOne({where:{email}})
        console.log(userId)
        const {groupName,groupImg}= await GroupList.findOne({where:{groupId}})
        await Invite.create({userId,groupName,groupImg})
    }

    findInvite = async(userId)=>{
        const invite = await Invite.findAll({where:{userId}})
        return invite
    }
}

module.exports = InviteRepository