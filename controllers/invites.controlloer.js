const InviteService = require('../services/invites.service')

class InviteController {
    inviteService = new InviteService()

    createInvite = async(req,res)=>{
        try{
            const {email} = req.body
            const {groupId} = req.params
            const invite = await this.inviteService.createInvite(email,groupId)
            res.status(201).json({data:invite})
        }catch(err){
            res.status(400).json(err)
        }
    }

    findInvite = async(req,res,next)=>{
        try{
            const {user}=res.locals
            const userId=user.userId
            const invite = await this.inviteService.findInvite(userId)
            res.status(200).json({data:invite})
        }catch(error){
            next(error)
        }
    }
}

module.exports = InviteController