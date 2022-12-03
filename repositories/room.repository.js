const { Room, Chat, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class RoomRepository extends Room {
  constructor() {
    super();
  }
  //*roomId 가져오기 room 없으면 생성
  findRoomId = async ({ groupId, sender, receiver }) => {
    const [findRoomId, created] = await Room.findOrCreate({
      where: { groupId: groupId, sender: sender, receiver: receiver },
      dafaults: {
        groupId: groupId,
        sender: sender,
        receiver: receiver,
      },
    });
    return findRoomId;
  };
  //* 그룹유저찾기
  findGroupUser = async ({ groupId, userId }) => {
    const findGroupUser = await GroupUser.findOne({
      where: { [Op.and]: [{ groupId }, { userId }] },
    });
    return findGroupUser;
  };
  //*채팅내용 불러오기
  getChat = async ({ roomId, offset, pageSize }) => {
    const { count, rows } = await Chat.findAndCountAll({
      where: { roomId },
      offset: offset,
      limit: parseInt(pageSize),
      attributes: ['groupUserId', 'message', 'createdAt'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    return rows;
  };
  //*존재하는 룸 찾기
  existRoom = async ({ roomId }) => {
    const existRoom = await Room.findOne({ where: { roomId } });
    return existRoom;
  };

  //*채팅 저장하기
  saveChat = async ({ roomId, groupUserId, message }) => {
    const saveChat = await Chat.create({ roomId, groupUserId, message });
    return saveChat;
  };

  //*안읽은 메세지
  unreadChat = async ({ sender, receiver, timestamps }) => {
    // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    // const kr_curr = new Date(utc + KR_TIME_DIFF);

    const unreadChat = await Chat.findAll({
      where: {
        [Op.and]: [{ sender }, { receiver }],
        [Op.gt]: { createdAt: timestamps },
        //[Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    });
    return unreadChat;
  };
}
module.exports = RoomRepository;
