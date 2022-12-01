const ChattingRepository = require('../repositories/chatting.repositroy')
const GroupRepository = require('../repositories/groups.repository');

class ChattingService{
    chattingRepository = new ChattingRepository()
    groupRepository = new GroupRepository();

    findGroupUser =async({userId,groupId})=>{
      const findGroupUser = await this.groupRepository.findGroupUser({
        userId,
        groupId,
      });
      if (!findGroupUser) {
        throw new ValidationError('그룹유저가 아닙니다.');
      }
      return findGroupUser
    }

    createRoom = async({groupId,groupUserIds})=>{
        await this.chattingRepository.createRoom({
            groupId,
            groupUserIds
        })
    }

    createChat = async({roomId,userId,message})=>{
        const findGroupUser = await this.groupRepository.findGroupUser({
            userId,
            groupId,
          });
          if (!findGroupUser) {
            throw new ValidationError('그룹유저가 아닙니다.');
          }
        await this.chattingRepository.createChat({
            roomId,
            gorupUserId:findGroupUser.gorupUserId,
            message
        })
    }

    findRoom = async({groupId,groupUserIds})=>{
      console.log(groupUserIds)
        const findRoom = await this.chattingRepository.findRoom({
            groupId,
            groupUserIds
        })
        return findRoom
    }

    getChat = async({roomId})=>{
        const getChat = await this.chattingRepository.getChat({roomId})
        return getChat
    }
}

module.exports = ChattingService