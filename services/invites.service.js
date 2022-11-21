const InviteRepository = require('../repositories/invites.repository')

class InviteService {
    inviteRepository = new InviteRepository()

    createInvite = async(email,groupId)=>{
        await this.inviteRepository.createInvite(email,groupId)
        return {message:"초대 성공"}
    }

    findInvite = async(userId)=>{
        const invite = await this.inviteRepository.findInvite(userId)
        return invite
    }
}

module.exports = InviteService