const ChattingRepository = require('../repositories/chatting.repositroy')

class ChattingService{
    chattingRepository = new ChattingRepository()

    createRoom = async({groupId,gorupUserId1,gorupUserId2})=>{
        await this.chattingRepository.createRoom({groupId,gorupUserId1,gorupUserId2})
    }
}