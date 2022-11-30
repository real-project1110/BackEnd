const {ChattingList,ChattingRoom} = require('../models')
const {Op} = require('sequelize')

class ChattingRepository{
    createRoom = async({groupId,gorupUserId1,gorupUserId2})=>{
        const createRoom = await ChattingRoom.create({groupId,gorupUserId1,gorupUserId2})
    }

    createChat = async({roomId,gorupUserId,message})=>{
        const createChat = await ChattingList.create({roomId,gorupUserId,message})
    }

    findRoom = async({groupId,gorupUserId})=>{
       const findRoom = await ChattingList.findAll({
        where:
        {groupId,
            [Op.or]:[
                {gorupUserId1:{gorupUserId}},
                {gorupUserId2:{gorupUserId}}
            ]}})
        return findRoom
    }

    getChat = async({roomId})=>{
       const getChat = await ChattingList.findOne({where:{roomId}})
       return getChat
    }
}
module.exports = ChattingRepository