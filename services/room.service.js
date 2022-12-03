const RoomRepository = require('../repositories/room.repository');
const ValidationError = require('../exceptions/index.exception');

class RoomService {
  roomRepository = new RoomRepository();
  //*roomId 찾기 없으면 만들어서 가져오기
  findRoomId = async ({ groupId, sender, receiver, userId }) => {
    const findGroupUser = await this.roomRepository.findGroupUser({
      groupId,
      userId,
    });
    if (!findGroupUser) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findRoomId = await this.roomRepository.findRoomId({
      groupId,
      sender,
      receiver,
    });
    return findRoomId.roomId;
  };
  //*채팅내역 불러오기
  getChat = async ({ roomId, page, pageSize }) => {
    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const getChat = await this.roomRepository.getChat({
      roomId,
      offset,
      pageSize,
    });
    if (!getChat) {
      throw new ValidationError('채팅내역이 없습니다.');
    }
    return getChat;
  };
  //*채팅내용 저장하기
  saveChat = async ({ roomId, groupUserId, message }) => {
    const existRoom = await this.roomRepository.existRoom({ roomId });
    if (!existRoom) {
      throw new ValidationError('존재하지 않는 채팅방입니다.');
    }
    const saveChat = await this.roomRepository.saveChat({
      roomId,
      groupUserId,
      message,
    });
    return saveChat;
  };
  //*안읽은 메세지
  unreadChat = async ({ sender, receiver, timestamps }) => {
    const unreadChat = await this.roomRepository.unreadChat({
      sender,
      receiver,
      timestamps,
    });
    let count = 0;
    if (!unreadChat) return count;
    count = unreadChat.length;
    return count;
  };
}
module.exports = RoomService;
