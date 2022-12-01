const {ChattingList,ChattingRoom} = require('../models')
const {Op} = require('sequelize')

class ChattingRepository{
    createRoom = async({groupId,groupUserIds})=>{
        const createRoom = await ChattingRoom.create({groupId,groupUserIds})
        return createRoom
    }


    createChat = async({roomId,groupUserId,message})=>{
        const createChat = await ChattingList.create({roomId,groupUserId,message})
    }

    findRoom = async({groupId,groupUserIds})=>{
       const findRoom = await ChattingRoom.findOne({where:{groupId,groupUserIds}})
        return findRoom
    }

    getChat = async({roomId})=>{
       const getChat = await ChattingList.findOne({where:{roomId}})
       return getChat
    }
}
module.exports = ChattingRepository